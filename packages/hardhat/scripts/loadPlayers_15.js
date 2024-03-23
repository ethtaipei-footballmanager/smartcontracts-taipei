const { ethers } = require("hardhat");
const fs = require('fs');

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Interacting with the smart contract using the account:", deployer.address);


    const rawdata = fs.readFileSync('/home/arjanjohan/git/hack/taipei24/scaffold-eth-2/packages/hardhat/scripts/contractAddresses.json');
    const addresses = JSON.parse(rawdata);

    const contractAddress = addresses.FootballGame;
    const contractArtifact = await hre.artifacts.readArtifact("FootballGame");
    const contract = new ethers.Contract(contractAddress, contractArtifact.abi, deployer);

    const players = [
        { player_uid: 1, team_id: 1, position: 1, attack: 119, defense: 79, speed: 58, power: 64, stamina: 101, technique: 104, goalkeeping: 56 },
{ player_uid: 2, team_id: 1, position: 1, attack: 116, defense: 111, speed: 96, power: 61, stamina: 82, technique: 91, goalkeeping: 2 },
{ player_uid: 3, team_id: 1, position: 1, attack: 60, defense: 66, speed: 128, power: 112, stamina: 75, technique: 121, goalkeeping: 14 },
{ player_uid: 4, team_id: 1, position: 4, attack: 163, defense: 143, speed: 202, power: 185, stamina: 174, technique: 181, goalkeeping: 0 },
{ player_uid: 5, team_id: 1, position: 4, attack: 178, defense: 224, speed: 163, power: 185, stamina: 179, technique: 191, goalkeeping: 0 },
{ player_uid: 6, team_id: 1, position: 2, attack: 129, defense: 125, speed: 113, power: 110, stamina: 119, technique: 109, goalkeeping: 0 },
{ player_uid: 7, team_id: 1, position: 2, attack: 188, defense: 130, speed: 148, power: 85, stamina: 104, technique: 108, goalkeeping: 0 },
{ player_uid: 8, team_id: 1, position: 4, attack: 157, defense: 127, speed: 193, power: 210, stamina: 126, technique: 195, goalkeeping: 0 },
{ player_uid: 9, team_id: 1, position: 4, attack: 128, defense: 173, speed: 147, power: 116, stamina: 138, technique: 140, goalkeeping: 0 },
{ player_uid: 10, team_id: 1, position: 3, attack: 175, defense: 203, speed: 177, power: 148, stamina: 125, technique: 91, goalkeeping: 0 },
{ player_uid: 11, team_id: 1, position: 2, attack: 152, defense: 74, speed: 170, power: 74, stamina: 106, technique: 150, goalkeeping: 0 },
{ player_uid: 12, team_id: 1, position: 2, attack: 89, defense: 68, speed: 160, power: 88, stamina: 89, technique: 193, goalkeeping: 0 },
{ player_uid: 13, team_id: 1, position: 4, attack: 151, defense: 107, speed: 116, power: 220, stamina: 212, technique: 166, goalkeeping: 0 },
{ player_uid: 14, team_id: 1, position: 2, attack: 172, defense: 85, speed: 142, power: 118, stamina: 189, technique: 152, goalkeeping: 0 },
{ player_uid: 15, team_id: 1, position: 4, attack: 218, defense: 167, speed: 121, power: 145, stamina: 150, technique: 233, goalkeeping: 0 }
    ];

    console.log("Adding players to the contract...");
    const MAX_RETRIES = 3; // Maximum number of retries for adding a player
    const RETRY_INTERVAL = 5000; // Time to wait between retries in milliseconds
    
    for (const player of players) {
        let attempt = 0;
        let playerAdded = false;
    
        while (attempt < MAX_RETRIES && !playerAdded) {
            console.log(`Adding player ${player.player_uid}... Attempt ${attempt + 1}`);
            try {
                await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
                const tx = await contract.addPlayer(
                    player.player_uid,
                    player.team_id,
                    player.position,
                    player.attack,
                    player.defense,
                    player.speed,
                    player.power,
                    player.stamina,
                    player.technique,
                    player.goalkeeping
                );
                await tx.wait();
                console.log(`Player ${player.player_uid} added successfully.`);
                playerAdded = true; // Mark as added to exit the loop
            } catch (error) {
                // console.error(`Failed to add player ${player.player_uid}:`, error);
                attempt++;
                if (attempt >= MAX_RETRIES) {
                    console.error(`Failed to add player ${player.player_uid} after ${MAX_RETRIES} attempts.`);
                }
            }
        }
    }
    

    console.log('All players have been added to the contract.');
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
