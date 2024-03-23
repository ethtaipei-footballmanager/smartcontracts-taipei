const { ethers } = require("hardhat");
const fs = require('fs');

async function main() {
    
    const rawdata = fs.readFileSync('/home/arjanjohan/git/hack/taipei24/scaffold-eth-2/packages/hardhat/scripts/contractAddresses.json');
    const addresses = JSON.parse(rawdata);

    const footballGameAddress = addresses.FootballGame;
    const footballCoinAddress = addresses.FootballCoin;
    const challengerAddress = addresses.ChallengerAddress;
    const opponentAddress = addresses.OpponentAddress;
    const wagerAmount = "1000000000000000000"; // 1 token in Wei
    const defaultFormation = [1, 4, 5, 6, 7 , 8 ,9 ,10, 11, 12 ,13]

    const challenger_signer = (await ethers.getSigners())[0];
    const opponent_signer = (await ethers.getSigners())[1];

    const FootballGameContract = await ethers.getContractFactory("FootballGame");
    let footballGame = await FootballGameContract.attach(footballGameAddress).connect(challenger_signer);

    const FootballCoinContract = await ethers.getContractFactory("FootballCoin");
    let footballCoin = await FootballCoinContract.attach(footballCoinAddress).connect(challenger_signer);

    // Mint and approve tokens for challenger
    const mintTx = await footballCoin.mint(challengerAddress, wagerAmount);
    await mintTx.wait();
    const approveTx = await footballCoin.approve(footballGameAddress, wagerAmount);
    await approveTx.wait();

    // Propose a game
    console.log(`Proposing a game from ${challengerAddress} to ${opponentAddress}`);
    const proposeTx = await footballGame.proposeGame(opponentAddress, wagerAmount, defaultFormation);
    console.log("gm");
    await proposeTx.wait();

    console.log("Game proposed");
    // Assume game ID is 1 for this example. Retrieve actual game ID from the event log in a real scenario.
    const gameId = await footballGame.getGameCount();
    console.log(`Game ID: ${gameId}`);

    footballGame = await FootballGameContract.attach(footballGameAddress).connect(opponent_signer);
    footballCoin = await FootballCoinContract.attach(footballCoinAddress).connect(opponent_signer);

    // Mint and approve tokens for challenger
    const mintTx2 = await footballCoin.mint(opponentAddress, wagerAmount);
    await mintTx2.wait();
    const approveTx2 = await footballCoin.approve(footballGameAddress, wagerAmount);
    await approveTx2.wait();

    // Accept the game
    console.log(`Accepting the game with ID: ${gameId}`);
    const acceptTx = await footballGame.acceptGame(gameId, defaultFormation);
    await acceptTx.wait();

    footballGame = await FootballGameContract.attach(footballGameAddress).connect(challenger_signer);

    // Reveal the outcome
    console.log(`Revealing the outcome for the game with ID: ${gameId}`);
    const revealTx = await footballGame.revealOutcome(gameId);
    await revealTx.wait();

    const results = await footballGame.getGameResult(gameId);
    console.log(`Game result: ${results}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });