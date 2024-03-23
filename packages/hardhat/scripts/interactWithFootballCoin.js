// interactWithFootballCoin.js
const fs = require('fs');

const { ethers } = require("hardhat");
//  npx hardhat run scripts/interactWithFootballCoin.js --network ten

async function main() {
    // Replace the following addresses with the actual addresses

    const rawdata = fs.readFileSync('/home/arjanjohan/git/hack/taipei24/scaffold-eth-2/packages/hardhat/scripts/contractAddresses.json');
    const addresses = JSON.parse(rawdata);

    const footballCoinAddress = addresses.FootballCoin;
    const accountToMintTo = addresses.ChallengerAddress; // Address to which you want to mint FootballCoin tokens
    const spenderAddress = addresses.FootballGame; // Address allowed to spend the tokens (another contract or wallet)
    const mintAmount = "1000000000000000000000"; // Amount to mint, e.g., 1000 FBC
    const allowanceAmount = "1000000000000000000000"; // Allowance amount, e.g., 500 FBC

    // Get the signer to send transactions
    const [deployer, opponent] = await ethers.getSigners();

    // Create an instance of your FootballCoin contract
    const FootballCoin = await ethers.getContractFactory("FootballCoin");
    const footballCoin = await FootballCoin.attach(footballCoinAddress).connect(deployer);

    // Minting tokens
    console.log(`Minting ${mintAmount} tokens to ${accountToMintTo}`);
    const mintTx = await footballCoin.mint(accountToMintTo, mintAmount);
    const mintReceipt = await mintTx.wait();
    console.log(`Minted ${mintAmount} tokens to ${accountToMintTo}`);
    console.log(`Mint transaction status: ${mintReceipt.status ? 'Success' : 'Failure'}`);

    // Approving spenderAddress to spend tokens
    console.log(`Approving ${spenderAddress} to spend ${allowanceAmount} tokens`);
    const approveTx = await footballCoin.approve(spenderAddress, allowanceAmount);
    const approveReceipt = await approveTx.wait();
    console.log(`Approved ${spenderAddress} to spend ${allowanceAmount} tokens`);
    console.log(`Approve transaction status: ${approveReceipt.status ? 'Success' : 'Failure'}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
