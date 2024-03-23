//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FootballGame {
	address public owner;
	IERC20 public footballCoin;
	uint public timelockBlocks;

	struct Game {
		address challenger;
		address opponent;
		uint256 wagerAmount;
		uint256[] challengerFormation;
		uint256[] opponentFormation;
		bool isFinished;
		GameResult result;
		uint blockNumber;
	}

	struct GameResult {
		uint goalsHomeTeam;
		uint goalsAwayTeam;
	}

	///////////////
	// MAPPINGS  //
	///////////////

	mapping(uint256 => uint256[]) private challenger_formation;
	mapping(uint256 => Game) public games;
	mapping(uint256 => GameResult) public gameResults;
	uint256 public gameCount;

	function getGameResult(
		uint256 gameId
	) public view returns (GameResult memory) {
		return gameResults[gameId];
	}

	function getGameCount() public view returns (uint256) {
		return gameCount;
	}

	///////////////
	// EVENTS  //
	///////////////

	event GameProposed(
		uint256 gameId,
		address indexed challenger,
		address indexed opponent,
		uint256 wagerAmount,
		uint blockNumber
	);

	event GameAccepted(
		uint256 gameId,
		address indexed opponent,
		uint256 wagerAmount,
		uint blockNumber
	);

	event GameFinished(uint256 gameId);

	event GameFinishedByTimelock(uint256 gameId);

	///////////////
	// PLAYERS   //
	///////////////

	struct Player {
		uint256 player_id;
		uint256 team_id;
		uint256 position; // 0 = Empty, 1 = Goalkeeper, 2 = Defense, 3 = Midfield, 4 = Attack
		uint128 attack;
		uint128 defense;
		uint128 speed;
		uint128 power;
		uint128 stamina;
		uint128 technique;
		uint128 goalkeeping;
	}

	mapping(uint256 => Player) public players;

	function addPlayer(
		uint256 playerId,
		uint256 teamId,
		uint256 position,
		uint128 attack,
		uint128 defense,
		uint128 speed,
		uint128 power,
		uint128 stamina,
		uint128 technique,
		uint128 goalkeeping
	) public onlyOwner {
		Player memory newPlayer = Player({
			player_id: playerId,
			team_id: teamId,
			position: position,
			attack: attack,
			defense: defense,
			speed: speed,
			power: power,
			stamina: stamina,
			technique: technique,
			goalkeeping: goalkeeping
		});

		players[playerId] = newPlayer;
	}

	///////////////
	// CONSTRUCTOR  //
	///////////////

	constructor(IERC20 _footballCoin, uint _timelockBlocks) {
		owner = msg.sender;
		footballCoin = _footballCoin;
		timelockBlocks = _timelockBlocks;
	}
	modifier onlyOwner() {
		require(msg.sender == owner, "Caller is not the owner");
		_;
	}

	///////////////
	// GAME FUNCTIONS  //
	///////////////

	function proposeGame(
		address opponent,
		uint256 wagerAmount,
		uint256[] memory formation
	) public {
		require(
			footballCoin.allowance(msg.sender, address(this)) >= wagerAmount,
			"Insufficient allowance for wager"
		);
		for (uint i = 0; i < formation.length; i++) {
			require(players[formation[i]].player_id != 0, "Invalid player id");
		}

		// Transfer the wager amount from the challenger to the contract
		footballCoin.transferFrom(msg.sender, address(this), wagerAmount);

		uint256 newGameId = ++gameCount;
		games[newGameId] = Game({
			challenger: msg.sender,
			opponent: opponent,
			wagerAmount: wagerAmount,
			challengerFormation: new uint256[](0),
			opponentFormation: new uint256[](0),
			isFinished: false,
			result: GameResult({ goalsHomeTeam: 0, goalsAwayTeam: 0 }),
			blockNumber: block.number
		});

		challenger_formation[newGameId] = formation;

		// Emitting events to notify about the new game proposal
		emit GameProposed(
			newGameId,
			msg.sender,
			opponent,
			wagerAmount,
			block.number
		);
	}

	function acceptGame(uint256 gameId, uint256[] memory formation) public {
		Game storage game = games[gameId];

		require(
			msg.sender == game.opponent,
			"Only the opponent can accept the game"
		);
		require(
			footballCoin.allowance(msg.sender, address(this)) >=
				game.wagerAmount,
			"Insufficient allowance for wager"
		);
		for (uint i = 0; i < formation.length; i++) {
			require(players[formation[i]].player_id != 0, "Invalid player id");
		}

		// Transfer the wager amount from the opponent to the contract
		footballCoin.transferFrom(msg.sender, address(this), game.wagerAmount);

		game.opponentFormation = formation;
		game.blockNumber = block.number;

		// Notify about game acceptance
		emit GameAccepted(gameId, msg.sender, game.wagerAmount, block.number);
	}

	function revealOutcome(uint256 gameId) public {
		Game storage game = games[gameId];

		require(
			msg.sender == game.challenger,
			"Only the challenger can reveal the outcome"
		);
		require(!game.isFinished, "The game is already finished");

		game.challengerFormation = challenger_formation[gameId];

		GameResult memory result = determineGameResult(game);
		gameResults[gameId] = result;

		game.isFinished = true;

		address winner = determineWinner(game, result);
		payoutWinners(game, winner);

		emit GameFinished(gameId);
	}

	function opponentClaimTimelock(uint256 gameId) public {
		Game storage game = games[gameId];

		require(
			msg.sender == game.opponent,
			"Only the opponent can claim the timelock"
		);
		require(
			block.number > game.blockNumber + timelockBlocks,
			"Opponent can claim timelock only after timelockBlocks have passed"
		);

		game.isFinished = true;
		payoutWinners(game, game.opponent);

		emit GameFinishedByTimelock(gameId);
	}

	///////////////
	// HELPER FUNCTIONS  //
	///////////////

	function determineGameResult(
		Game storage game
	) private view returns (GameResult memory) {
		GameResult memory result = GameResult({
			goalsHomeTeam: 0,
			goalsAwayTeam: 0
		});

		// Player memory homeGoalkeeper = players[game.challengerFormation[1]];
		// Player memory awayGoalkeeper = players[game.opponentFormation[1]];
		bytes32 prevRandao = blockhash(block.number - 1);
		uint256[] memory randomValues = extractRandomValues(10, prevRandao);
		for (uint i = 1; i < game.challengerFormation.length; i++) {
			Player memory homePlayer = players[game.challengerFormation[i]];
			Player memory awayPlayer = players[
				game.opponentFormation[game.challengerFormation.length - i]
			];
			uint256 totalspeed = homePlayer.speed + awayPlayer.speed;
			uint256 randomSpeed = uint256(prevRandao) % totalspeed;
			if (homePlayer.speed > randomSpeed) {
				// Home player attacks
				if (homePlayer.attack > randomValues[i - 1]) {
					result.goalsHomeTeam++;
				}
			} else {
				if (awayPlayer.attack > randomValues[i - 1]) {
					result.goalsAwayTeam++;
				}
			}
		}

		return result;
	}

	function extractRandomValues(
		uint numberOfValues,
		bytes32 prevRandao
	) public pure returns (uint[] memory) {
		require(numberOfValues > 0, "Number of values must be greater than 0");
		uint[] memory randomValues = new uint[](numberOfValues);
		uint256 randValue = uint256(prevRandao);

		for (uint i = 0; i < numberOfValues; i++) {
			randomValues[i] = randValue % 100;
			randValue = randValue / 256; // Shift right by 2 hex digits
		}

		return randomValues;
	}

	function determineWinner(
		Game storage game,
		GameResult memory result
	) private view returns (address) {
		if (result.goalsHomeTeam > result.goalsAwayTeam) {
			return game.challenger;
		} else if (result.goalsHomeTeam < result.goalsAwayTeam) {
			return game.opponent;
		}
		return address(0); // It's a draw
	}

	function payoutWinners(Game storage game, address winner) private {
		if (winner == address(0)) {
			require(
				footballCoin.transfer(game.challenger, game.wagerAmount),
				"Transfer to challenger failed"
			);
			require(
				footballCoin.transfer(game.opponent, game.wagerAmount),
				"Transfer to opponent failed"
			);
		} else {
			uint256 totalPot = game.wagerAmount * 2;
			require(
				footballCoin.transfer(winner, totalPot),
				"Transfer to winner failed"
			);
		}
	}
}
