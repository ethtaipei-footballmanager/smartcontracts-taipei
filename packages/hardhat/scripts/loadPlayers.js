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
{ player_uid: 15, team_id: 1, position: 4, attack: 218, defense: 167, speed: 121, power: 145, stamina: 150, technique: 233, goalkeeping: 0 },
{ player_uid: 16, team_id: 1, position: 3, attack: 189, defense: 100, speed: 149, power: 93, stamina: 131, technique: 171, goalkeeping: 0 },
{ player_uid: 17, team_id: 1, position: 2, attack: 174, defense: 131, speed: 87, power: 62, stamina: 143, technique: 83, goalkeeping: 0 },
{ player_uid: 18, team_id: 1, position: 4, attack: 214, defense: 135, speed: 170, power: 178, stamina: 230, technique: 90, goalkeeping: 0 },
{ player_uid: 19, team_id: 1, position: 3, attack: 98, defense: 199, speed: 178, power: 170, stamina: 163, technique: 159, goalkeeping: 0 },
{ player_uid: 20, team_id: 1, position: 3, attack: 125, defense: 207, speed: 178, power: 103, stamina: 211, technique: 142, goalkeeping: 0 },
{ player_uid: 21, team_id: 1, position: 3, attack: 185, defense: 121, speed: 144, power: 113, stamina: 160, technique: 164, goalkeeping: 0 },
{ player_uid: 22, team_id: 1, position: 2, attack: 87, defense: 92, speed: 156, power: 146, stamina: 177, technique: 101, goalkeeping: 0 },
{ player_uid: 23, team_id: 1, position: 2, attack: 103, defense: 172, speed: 118, power: 69, stamina: 79, technique: 137, goalkeeping: 0 },
{ player_uid: 24, team_id: 1, position: 3, attack: 179, defense: 187, speed: 159, power: 69, stamina: 154, technique: 191, goalkeeping: 0 },
{ player_uid: 25, team_id: 1, position: 3, attack: 101, defense: 141, speed: 144, power: 148, stamina: 126, technique: 117, goalkeeping: 0 },
{ player_uid: 26, team_id: 1, position: 4, attack: 88, defense: 222, speed: 153, power: 116, stamina: 192, technique: 148, goalkeeping: 0 },
{ player_uid: 27, team_id: 1, position: 4, attack: 93, defense: 154, speed: 202, power: 200, stamina: 126, technique: 222, goalkeeping: 0 },
{ player_uid: 28, team_id: 1, position: 3, attack: 141, defense: 138, speed: 183, power: 69, stamina: 85, technique: 191, goalkeeping: 0 },
{ player_uid: 29, team_id: 1, position: 3, attack: 85, defense: 116, speed: 134, power: 141, stamina: 112, technique: 149, goalkeeping: 0 },
{ player_uid: 30, team_id: 1, position: 2, attack: 81, defense: 118, speed: 87, power: 149, stamina: 108, technique: 82, goalkeeping: 0 },
{ player_uid: 31, team_id: 2, position: 1, attack: 93, defense: 100, speed: 63, power: 116, stamina: 106, technique: 109, goalkeeping: 20 },
{ player_uid: 32, team_id: 2, position: 1, attack: 66, defense: 68, speed: 98, power: 107, stamina: 62, technique: 69, goalkeeping: 25 },
{ player_uid: 33, team_id: 2, position: 1, attack: 95, defense: 99, speed: 45, power: 57, stamina: 92, technique: 55, goalkeeping: 121 },
{ player_uid: 34, team_id: 2, position: 2, attack: 81, defense: 114, speed: 122, power: 184, stamina: 173, technique: 141, goalkeeping: 0 },
{ player_uid: 35, team_id: 2, position: 4, attack: 101, defense: 175, speed: 67, power: 222, stamina: 114, technique: 111, goalkeeping: 0 },
{ player_uid: 36, team_id: 2, position: 2, attack: 129, defense: 97, speed: 68, power: 66, stamina: 181, technique: 92, goalkeeping: 0 },
{ player_uid: 37, team_id: 2, position: 4, attack: 187, defense: 218, speed: 91, power: 225, stamina: 157, technique: 228, goalkeeping: 0 },
{ player_uid: 38, team_id: 2, position: 3, attack: 132, defense: 166, speed: 130, power: 128, stamina: 110, technique: 112, goalkeeping: 0 },
{ player_uid: 39, team_id: 2, position: 2, attack: 87, defense: 89, speed: 117, power: 76, stamina: 68, technique: 168, goalkeeping: 0 },
{ player_uid: 40, team_id: 2, position: 3, attack: 151, defense: 76, speed: 173, power: 160, stamina: 138, technique: 153, goalkeeping: 0 },
{ player_uid: 41, team_id: 2, position: 2, attack: 94, defense: 82, speed: 85, power: 82, stamina: 82, technique: 106, goalkeeping: 0 },
{ player_uid: 42, team_id: 2, position: 2, attack: 120, defense: 176, speed: 108, power: 189, stamina: 155, technique: 146, goalkeeping: 0 },
{ player_uid: 43, team_id: 2, position: 2, attack: 149, defense: 77, speed: 75, power: 187, stamina: 167, technique: 67, goalkeeping: 0 },
{ player_uid: 44, team_id: 2, position: 4, attack: 130, defense: 203, speed: 198, power: 219, stamina: 114, technique: 212, goalkeeping: 0 },
{ player_uid: 45, team_id: 2, position: 3, attack: 133, defense: 82, speed: 64, power: 167, stamina: 169, technique: 187, goalkeeping: 0 },
{ player_uid: 46, team_id: 2, position: 4, attack: 199, defense: 189, speed: 71, power: 126, stamina: 166, technique: 135, goalkeeping: 0 },
{ player_uid: 47, team_id: 2, position: 2, attack: 107, defense: 150, speed: 83, power: 134, stamina: 69, technique: 104, goalkeeping: 0 },
{ player_uid: 48, team_id: 2, position: 3, attack: 152, defense: 95, speed: 82, power: 138, stamina: 88, technique: 210, goalkeeping: 0 },
{ player_uid: 49, team_id: 2, position: 4, attack: 170, defense: 227, speed: 101, power: 209, stamina: 131, technique: 222, goalkeeping: 0 },
{ player_uid: 50, team_id: 2, position: 4, attack: 79, defense: 82, speed: 135, power: 107, stamina: 195, technique: 122, goalkeeping: 0 },
{ player_uid: 51, team_id: 2, position: 2, attack: 128, defense: 103, speed: 119, power: 85, stamina: 183, technique: 137, goalkeeping: 0 },
{ player_uid: 52, team_id: 2, position: 4, attack: 105, defense: 222, speed: 105, power: 177, stamina: 181, technique: 149, goalkeeping: 0 },
{ player_uid: 53, team_id: 2, position: 3, attack: 151, defense: 89, speed: 172, power: 89, stamina: 122, technique: 164, goalkeeping: 0 },
{ player_uid: 54, team_id: 2, position: 3, attack: 156, defense: 133, speed: 73, power: 164, stamina: 114, technique: 146, goalkeeping: 0 },
{ player_uid: 55, team_id: 2, position: 4, attack: 142, defense: 177, speed: 167, power: 105, stamina: 141, technique: 198, goalkeeping: 0 },
{ player_uid: 56, team_id: 2, position: 3, attack: 122, defense: 204, speed: 135, power: 118, stamina: 198, technique: 185, goalkeeping: 0 },
{ player_uid: 57, team_id: 2, position: 3, attack: 176, defense: 172, speed: 116, power: 91, stamina: 112, technique: 125, goalkeeping: 0 },
{ player_uid: 58, team_id: 2, position: 3, attack: 81, defense: 101, speed: 195, power: 212, stamina: 198, technique: 116, goalkeeping: 0 },
{ player_uid: 59, team_id: 2, position: 2, attack: 71, defense: 92, speed: 54, power: 133, stamina: 134, technique: 172, goalkeeping: 0 },
{ player_uid: 60, team_id: 2, position: 4, attack: 223, defense: 129, speed: 205, power: 191, stamina: 148, technique: 146, goalkeeping: 0 },
{ player_uid: 61, team_id: 3, position: 1, attack: 54, defense: 93, speed: 135, power: 114, stamina: 101, technique: 106, goalkeeping: 135 },
{ player_uid: 62, team_id: 3, position: 1, attack: 128, defense: 73, speed: 119, power: 60, stamina: 72, technique: 80, goalkeeping: 170 },
{ player_uid: 63, team_id: 3, position: 1, attack: 91, defense: 60, speed: 120, power: 80, stamina: 122, technique: 83, goalkeeping: 196 },
{ player_uid: 64, team_id: 3, position: 3, attack: 168, defense: 157, speed: 85, power: 124, stamina: 210, technique: 151, goalkeeping: 0 },
{ player_uid: 65, team_id: 3, position: 4, attack: 171, defense: 134, speed: 152, power: 121, stamina: 142, technique: 102, goalkeeping: 0 },
{ player_uid: 66, team_id: 3, position: 4, attack: 184, defense: 88, speed: 114, power: 128, stamina: 144, technique: 150, goalkeeping: 0 },
{ player_uid: 67, team_id: 3, position: 3, attack: 155, defense: 96, speed: 213, power: 196, stamina: 185, technique: 212, goalkeeping: 0 },
{ player_uid: 68, team_id: 3, position: 2, attack: 84, defense: 169, speed: 138, power: 62, stamina: 129, technique: 75, goalkeeping: 0 },
{ player_uid: 69, team_id: 3, position: 2, attack: 180, defense: 70, speed: 168, power: 149, stamina: 118, technique: 182, goalkeeping: 0 },
{ player_uid: 70, team_id: 3, position: 2, attack: 89, defense: 176, speed: 128, power: 150, stamina: 182, technique: 73, goalkeeping: 0 },
{ player_uid: 71, team_id: 3, position: 2, attack: 71, defense: 162, speed: 147, power: 121, stamina: 191, technique: 173, goalkeeping: 0 },
{ player_uid: 72, team_id: 3, position: 3, attack: 82, defense: 159, speed: 122, power: 125, stamina: 210, technique: 191, goalkeeping: 0 },
{ player_uid: 73, team_id: 3, position: 3, attack: 201, defense: 174, speed: 121, power: 115, stamina: 172, technique: 115, goalkeeping: 0 },
{ player_uid: 74, team_id: 3, position: 2, attack: 87, defense: 120, speed: 133, power: 75, stamina: 106, technique: 104, goalkeeping: 0 },
{ player_uid: 75, team_id: 3, position: 4, attack: 142, defense: 124, speed: 231, power: 167, stamina: 200, technique: 219, goalkeeping: 0 },
{ player_uid: 76, team_id: 3, position: 3, attack: 162, defense: 109, speed: 146, power: 65, stamina: 113, technique: 161, goalkeeping: 0 },
{ player_uid: 77, team_id: 3, position: 3, attack: 172, defense: 208, speed: 113, power: 78, stamina: 165, technique: 113, goalkeeping: 0 },
{ player_uid: 78, team_id: 3, position: 4, attack: 115, defense: 143, speed: 119, power: 152, stamina: 178, technique: 88, goalkeeping: 0 },
{ player_uid: 79, team_id: 3, position: 2, attack: 139, defense: 160, speed: 177, power: 89, stamina: 138, technique: 135, goalkeeping: 0 },
{ player_uid: 80, team_id: 3, position: 3, attack: 154, defense: 156, speed: 132, power: 119, stamina: 217, technique: 130, goalkeeping: 0 },
{ player_uid: 81, team_id: 3, position: 3, attack: 99, defense: 210, speed: 117, power: 108, stamina: 170, technique: 91, goalkeeping: 0 },
{ player_uid: 82, team_id: 3, position: 4, attack: 193, defense: 179, speed: 218, power: 133, stamina: 145, technique: 211, goalkeeping: 0 },
{ player_uid: 83, team_id: 3, position: 2, attack: 154, defense: 72, speed: 180, power: 75, stamina: 192, technique: 156, goalkeeping: 0 },
{ player_uid: 84, team_id: 3, position: 4, attack: 112, defense: 180, speed: 101, power: 204, stamina: 131, technique: 191, goalkeeping: 0 },
{ player_uid: 85, team_id: 3, position: 4, attack: 143, defense: 83, speed: 141, power: 175, stamina: 108, technique: 157, goalkeeping: 0 },
{ player_uid: 86, team_id: 3, position: 4, attack: 122, defense: 157, speed: 218, power: 132, stamina: 238, technique: 194, goalkeeping: 0 },
{ player_uid: 87, team_id: 3, position: 2, attack: 182, defense: 177, speed: 149, power: 170, stamina: 148, technique: 156, goalkeeping: 0 },
{ player_uid: 88, team_id: 3, position: 4, attack: 169, defense: 217, speed: 156, power: 86, stamina: 115, technique: 217, goalkeeping: 0 },
{ player_uid: 89, team_id: 3, position: 3, attack: 187, defense: 105, speed: 206, power: 199, stamina: 216, technique: 117, goalkeeping: 0 },
{ player_uid: 90, team_id: 3, position: 2, attack: 109, defense: 70, speed: 157, power: 170, stamina: 87, technique: 105, goalkeeping: 0 },
{ player_uid: 91, team_id: 4, position: 1, attack: 58, defense: 128, speed: 109, power: 108, stamina: 54, technique: 114, goalkeeping: 27 },
{ player_uid: 92, team_id: 4, position: 1, attack: 90, defense: 95, speed: 95, power: 102, stamina: 121, technique: 65, goalkeeping: 192 },
{ player_uid: 93, team_id: 4, position: 1, attack: 123, defense: 136, speed: 131, power: 79, stamina: 94, technique: 116, goalkeeping: 137 },
{ player_uid: 94, team_id: 4, position: 4, attack: 198, defense: 142, speed: 203, power: 106, stamina: 111, technique: 142, goalkeeping: 0 },
{ player_uid: 95, team_id: 4, position: 3, attack: 157, defense: 137, speed: 132, power: 109, stamina: 202, technique: 92, goalkeeping: 0 },
{ player_uid: 96, team_id: 4, position: 4, attack: 207, defense: 178, speed: 188, power: 98, stamina: 152, technique: 178, goalkeeping: 0 },
{ player_uid: 97, team_id: 4, position: 2, attack: 135, defense: 85, speed: 188, power: 93, stamina: 125, technique: 191, goalkeeping: 0 },
{ player_uid: 98, team_id: 4, position: 2, attack: 152, defense: 81, speed: 112, power: 101, stamina: 78, technique: 146, goalkeeping: 0 },
{ player_uid: 99, team_id: 4, position: 3, attack: 151, defense: 186, speed: 210, power: 132, stamina: 79, technique: 157, goalkeeping: 0 },
{ player_uid: 100, team_id: 4, position: 2, attack: 104, defense: 77, speed: 104, power: 93, stamina: 84, technique: 118, goalkeeping: 0 },
{ player_uid: 101, team_id: 4, position: 3, attack: 164, defense: 196, speed: 185, power: 105, stamina: 134, technique: 126, goalkeeping: 0 },
{ player_uid: 102, team_id: 4, position: 3, attack: 125, defense: 173, speed: 76, power: 139, stamina: 168, technique: 79, goalkeeping: 0 },
{ player_uid: 103, team_id: 4, position: 3, attack: 119, defense: 114, speed: 102, power: 193, stamina: 72, technique: 153, goalkeeping: 0 },
{ player_uid: 104, team_id: 4, position: 3, attack: 211, defense: 218, speed: 121, power: 161, stamina: 195, technique: 142, goalkeeping: 0 },
{ player_uid: 105, team_id: 4, position: 3, attack: 202, defense: 208, speed: 204, power: 136, stamina: 118, technique: 143, goalkeeping: 0 },
{ player_uid: 106, team_id: 4, position: 2, attack: 100, defense: 150, speed: 133, power: 134, stamina: 184, technique: 86, goalkeeping: 0 },
{ player_uid: 107, team_id: 4, position: 3, attack: 95, defense: 197, speed: 78, power: 160, stamina: 131, technique: 153, goalkeeping: 0 },
{ player_uid: 108, team_id: 4, position: 4, attack: 93, defense: 171, speed: 183, power: 135, stamina: 224, technique: 223, goalkeeping: 0 },
{ player_uid: 109, team_id: 4, position: 4, attack: 109, defense: 150, speed: 203, power: 147, stamina: 89, technique: 94, goalkeeping: 0 },
{ player_uid: 110, team_id: 4, position: 2, attack: 165, defense: 177, speed: 183, power: 163, stamina: 72, technique: 159, goalkeeping: 0 },
{ player_uid: 111, team_id: 4, position: 2, attack: 101, defense: 179, speed: 121, power: 112, stamina: 120, technique: 147, goalkeeping: 0 },
{ player_uid: 112, team_id: 4, position: 2, attack: 192, defense: 118, speed: 126, power: 86, stamina: 169, technique: 105, goalkeeping: 0 },
{ player_uid: 113, team_id: 4, position: 4, attack: 203, defense: 127, speed: 84, power: 208, stamina: 138, technique: 117, goalkeeping: 0 },
{ player_uid: 114, team_id: 4, position: 4, attack: 125, defense: 189, speed: 175, power: 164, stamina: 117, technique: 106, goalkeeping: 0 },
{ player_uid: 115, team_id: 4, position: 2, attack: 91, defense: 162, speed: 83, power: 115, stamina: 105, technique: 181, goalkeeping: 0 },
{ player_uid: 116, team_id: 4, position: 3, attack: 102, defense: 215, speed: 77, power: 129, stamina: 197, technique: 163, goalkeeping: 0 },
{ player_uid: 117, team_id: 4, position: 4, attack: 153, defense: 156, speed: 97, power: 158, stamina: 224, technique: 214, goalkeeping: 0 },
{ player_uid: 118, team_id: 4, position: 2, attack: 134, defense: 153, speed: 141, power: 134, stamina: 161, technique: 129, goalkeeping: 0 },
{ player_uid: 119, team_id: 4, position: 4, attack: 95, defense: 226, speed: 83, power: 120, stamina: 91, technique: 228, goalkeeping: 0 },
{ player_uid: 120, team_id: 4, position: 4, attack: 202, defense: 95, speed: 104, power: 108, stamina: 205, technique: 81, goalkeeping: 0 },
{ player_uid: 121, team_id: 5, position: 1, attack: 90, defense: 99, speed: 81, power: 72, stamina: 53, technique: 98, goalkeeping: 77 },
{ player_uid: 122, team_id: 5, position: 1, attack: 100, defense: 84, speed: 90, power: 105, stamina: 108, technique: 133, goalkeeping: 87 },
{ player_uid: 123, team_id: 5, position: 1, attack: 100, defense: 130, speed: 98, power: 129, stamina: 79, technique: 104, goalkeeping: 189 },
{ player_uid: 124, team_id: 5, position: 2, attack: 111, defense: 144, speed: 101, power: 120, stamina: 162, technique: 98, goalkeeping: 0 },
{ player_uid: 125, team_id: 5, position: 2, attack: 85, defense: 198, speed: 93, power: 187, stamina: 133, technique: 83, goalkeeping: 0 },
{ player_uid: 126, team_id: 5, position: 3, attack: 165, defense: 205, speed: 79, power: 142, stamina: 103, technique: 185, goalkeeping: 0 },
{ player_uid: 127, team_id: 5, position: 4, attack: 118, defense: 139, speed: 91, power: 181, stamina: 219, technique: 159, goalkeeping: 0 },
{ player_uid: 128, team_id: 5, position: 2, attack: 110, defense: 122, speed: 158, power: 73, stamina: 59, technique: 112, goalkeeping: 0 },
{ player_uid: 129, team_id: 5, position: 2, attack: 71, defense: 191, speed: 65, power: 127, stamina: 71, technique: 173, goalkeeping: 0 },
{ player_uid: 130, team_id: 5, position: 4, attack: 209, defense: 119, speed: 198, power: 101, stamina: 111, technique: 121, goalkeeping: 0 },
{ player_uid: 131, team_id: 5, position: 4, attack: 186, defense: 94, speed: 137, power: 170, stamina: 195, technique: 217, goalkeeping: 0 },
{ player_uid: 132, team_id: 5, position: 2, attack: 72, defense: 190, speed: 141, power: 174, stamina: 71, technique: 103, goalkeeping: 0 },
{ player_uid: 133, team_id: 5, position: 3, attack: 152, defense: 109, speed: 203, power: 137, stamina: 160, technique: 167, goalkeeping: 0 },
{ player_uid: 134, team_id: 5, position: 2, attack: 169, defense: 142, speed: 125, power: 87, stamina: 169, technique: 129, goalkeeping: 0 },
{ player_uid: 135, team_id: 5, position: 4, attack: 188, defense: 236, speed: 123, power: 141, stamina: 104, technique: 104, goalkeeping: 0 },
{ player_uid: 136, team_id: 5, position: 3, attack: 196, defense: 172, speed: 70, power: 204, stamina: 166, technique: 107, goalkeeping: 0 },
{ player_uid: 137, team_id: 5, position: 2, attack: 119, defense: 194, speed: 180, power: 100, stamina: 114, technique: 72, goalkeeping: 0 },
{ player_uid: 138, team_id: 5, position: 3, attack: 154, defense: 220, speed: 103, power: 130, stamina: 157, technique: 76, goalkeeping: 0 },
{ player_uid: 139, team_id: 5, position: 4, attack: 88, defense: 106, speed: 90, power: 202, stamina: 68, technique: 169, goalkeeping: 0 },
{ player_uid: 140, team_id: 5, position: 2, attack: 164, defense: 187, speed: 127, power: 128, stamina: 70, technique: 73, goalkeeping: 0 },
{ player_uid: 141, team_id: 5, position: 3, attack: 131, defense: 133, speed: 139, power: 88, stamina: 114, technique: 179, goalkeeping: 0 },
{ player_uid: 142, team_id: 5, position: 4, attack: 172, defense: 182, speed: 177, power: 168, stamina: 199, technique: 192, goalkeeping: 0 },
{ player_uid: 143, team_id: 5, position: 4, attack: 130, defense: 206, speed: 154, power: 186, stamina: 101, technique: 213, goalkeeping: 0 },
{ player_uid: 144, team_id: 5, position: 3, attack: 81, defense: 198, speed: 164, power: 195, stamina: 94, technique: 171, goalkeeping: 0 },
{ player_uid: 145, team_id: 5, position: 4, attack: 228, defense: 110, speed: 76, power: 222, stamina: 138, technique: 168, goalkeeping: 0 },
{ player_uid: 146, team_id: 5, position: 2, attack: 116, defense: 197, speed: 113, power: 141, stamina: 128, technique: 159, goalkeeping: 0 },
{ player_uid: 147, team_id: 5, position: 3, attack: 116, defense: 145, speed: 76, power: 179, stamina: 67, technique: 202, goalkeeping: 0 },
{ player_uid: 148, team_id: 5, position: 3, attack: 131, defense: 212, speed: 151, power: 120, stamina: 92, technique: 109, goalkeeping: 0 },
{ player_uid: 149, team_id: 5, position: 3, attack: 87, defense: 90, speed: 95, power: 98, stamina: 83, technique: 140, goalkeeping: 0 },
{ player_uid: 150, team_id: 5, position: 4, attack: 157, defense: 142, speed: 95, power: 201, stamina: 159, technique: 175, goalkeeping: 0 },
{ player_uid: 151, team_id: 6, position: 1, attack: 43, defense: 123, speed: 77, power: 69, stamina: 108, technique: 73, goalkeeping: 153 },
{ player_uid: 152, team_id: 6, position: 1, attack: 76, defense: 118, speed: 78, power: 97, stamina: 68, technique: 84, goalkeeping: 83 },
{ player_uid: 153, team_id: 6, position: 1, attack: 81, defense: 66, speed: 73, power: 111, stamina: 90, technique: 104, goalkeeping: 147 },
{ player_uid: 154, team_id: 6, position: 2, attack: 83, defense: 97, speed: 60, power: 166, stamina: 200, technique: 115, goalkeeping: 0 },
{ player_uid: 155, team_id: 6, position: 2, attack: 89, defense: 163, speed: 106, power: 107, stamina: 82, technique: 125, goalkeeping: 0 },
{ player_uid: 156, team_id: 6, position: 3, attack: 142, defense: 90, speed: 104, power: 122, stamina: 187, technique: 190, goalkeeping: 0 },
{ player_uid: 157, team_id: 6, position: 4, attack: 66, defense: 97, speed: 84, power: 84, stamina: 113, technique: 215, goalkeeping: 0 },
{ player_uid: 158, team_id: 6, position: 3, attack: 139, defense: 70, speed: 121, power: 78, stamina: 203, technique: 80, goalkeeping: 0 },
{ player_uid: 159, team_id: 6, position: 4, attack: 142, defense: 170, speed: 125, power: 203, stamina: 210, technique: 176, goalkeeping: 0 },
{ player_uid: 160, team_id: 6, position: 2, attack: 139, defense: 152, speed: 68, power: 188, stamina: 171, technique: 106, goalkeeping: 0 },
{ player_uid: 161, team_id: 6, position: 2, attack: 133, defense: 150, speed: 167, power: 70, stamina: 108, technique: 117, goalkeeping: 0 },
{ player_uid: 162, team_id: 6, position: 2, attack: 100, defense: 162, speed: 110, power: 146, stamina: 199, technique: 164, goalkeeping: 0 },
{ player_uid: 163, team_id: 6, position: 2, attack: 168, defense: 106, speed: 136, power: 149, stamina: 84, technique: 125, goalkeeping: 0 },
{ player_uid: 164, team_id: 6, position: 2, attack: 57, defense: 69, speed: 78, power: 177, stamina: 200, technique: 157, goalkeeping: 0 },
{ player_uid: 165, team_id: 6, position: 4, attack: 66, defense: 79, speed: 180, power: 180, stamina: 222, technique: 95, goalkeeping: 0 },
{ player_uid: 166, team_id: 6, position: 4, attack: 91, defense: 210, speed: 205, power: 230, stamina: 197, technique: 104, goalkeeping: 0 },
{ player_uid: 167, team_id: 6, position: 4, attack: 135, defense: 161, speed: 96, power: 148, stamina: 164, technique: 217, goalkeeping: 0 },
{ player_uid: 168, team_id: 6, position: 4, attack: 89, defense: 145, speed: 120, power: 182, stamina: 142, technique: 114, goalkeeping: 0 },
{ player_uid: 169, team_id: 6, position: 3, attack: 176, defense: 123, speed: 193, power: 209, stamina: 108, technique: 114, goalkeeping: 0 },
{ player_uid: 170, team_id: 6, position: 3, attack: 65, defense: 163, speed: 69, power: 120, stamina: 89, technique: 141, goalkeeping: 0 },
{ player_uid: 171, team_id: 6, position: 3, attack: 89, defense: 160, speed: 78, power: 73, stamina: 197, technique: 202, goalkeeping: 0 },
{ player_uid: 172, team_id: 6, position: 2, attack: 101, defense: 120, speed: 144, power: 119, stamina: 187, technique: 153, goalkeeping: 0 },
{ player_uid: 173, team_id: 6, position: 4, attack: 151, defense: 119, speed: 172, power: 164, stamina: 188, technique: 126, goalkeeping: 0 },
{ player_uid: 174, team_id: 6, position: 3, attack: 192, defense: 143, speed: 60, power: 156, stamina: 214, technique: 186, goalkeeping: 0 },
{ player_uid: 175, team_id: 6, position: 4, attack: 63, defense: 137, speed: 183, power: 155, stamina: 212, technique: 91, goalkeeping: 0 },
{ player_uid: 176, team_id: 6, position: 2, attack: 69, defense: 65, speed: 122, power: 117, stamina: 175, technique: 76, goalkeeping: 0 },
{ player_uid: 177, team_id: 6, position: 4, attack: 196, defense: 161, speed: 108, power: 216, stamina: 196, technique: 179, goalkeeping: 0 },
{ player_uid: 178, team_id: 6, position: 3, attack: 96, defense: 144, speed: 151, power: 99, stamina: 161, technique: 213, goalkeeping: 0 },
{ player_uid: 179, team_id: 6, position: 3, attack: 87, defense: 137, speed: 87, power: 128, stamina: 117, technique: 175, goalkeeping: 0 },
{ player_uid: 180, team_id: 6, position: 3, attack: 192, defense: 178, speed: 66, power: 168, stamina: 99, technique: 211, goalkeeping: 0 }
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
