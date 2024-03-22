//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FootballGame {
	address public owner;
	IERC20 public footballCoin;

	struct Game {
		address challenger;
		address opponent;
		uint256 wagerAmount;
		uint256[] challengerFormation;
		uint256[] opponentFormation;
		bool isFinished;
		string result;
	}

	///////////////
	// MAPPINGS  //
	///////////////

	// Private storage for challenger_formation by game ID
	mapping(uint256 => uint256[]) private challenger_formation;

	// A mapping to store game data, indexed by a game ID
	mapping(uint256 => Game) public games;
	uint256 public gameCount;

	///////////////
	// EVENTS  //
	///////////////

	event GameProposed(
		uint256 gameId,
		address indexed challenger,
		address indexed opponent,
		uint256 wagerAmount
	);

	event GameAccepted(
		uint256 gameId,
		address indexed opponent,
		uint256 wagerAmount
	);

	event GameFinished(
		uint256 gameId,
		address indexed challenger,
		address indexed opponent,
		string result // Placeholder for the game result, you can customize this
	);

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

	constructor(IERC20 _footballCoin) {
		owner = msg.sender;
		footballCoin = _footballCoin;
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
			result: ""
		});

		challenger_formation[newGameId] = formation;

		// Emitting events to notify about the new game proposal
		emit GameProposed(newGameId, msg.sender, opponent, wagerAmount);
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

		// Transfer the wager amount from the opponent to the contract
		footballCoin.transferFrom(msg.sender, address(this), game.wagerAmount);

		game.opponentFormation = formation;

		// Notify about game acceptance
		emit GameAccepted(gameId, msg.sender, game.wagerAmount);
	}

	function revealOutcome(uint256 gameId) public {
		Game storage game = games[gameId];

		require(
			msg.sender == game.challenger,
			"Only the challenger can reveal the outcome"
		);

		require(!game.isFinished, "The game is already finished");

		game.challengerFormation = challenger_formation[gameId];

		string memory result = determineGameResult(game);
		game.result = result;

		game.isFinished = true; // Mark the game as finished
		emit GameFinished(gameId, game.challenger, game.opponent, result);
	}

	///////////////
	// HELPER FUNCTIONS  //
	///////////////

	function determineGameResult(
		Game storage game
	) private view returns (string memory) {
		// Your logic to determine the game result
		// You can access the game's data using `games[gameId]`

		return "Placeholder result"; // Replace this with actual game result logic
	}

	function payoutWinners(
		Game storage game
	) private view returns (string memory) {
		// Your logic to determine the game result
		// You can access the game's data using `games[gameId]`

		return "Placeholder result"; // Replace this with actual game result logic
	}
}
