# Ten Taipei Football Manager

<p align="center">
<img src="logo.png" alt="logo" width="500"/>
</p>

⚽ Ten Taipei Football Manager is an on-chain football manager game that leverages the privacy that TEN Protocol provides to hide players' strategies from opponents.

⚙️ Built using Solidity, Hardhat, wagmi, React and Javascript.

- 🧾 **Privacy on TEN**: Players commit to a strategy privately using TEN Protocol.
- ⛓️ **Smart contracts**: Verifies strategies and results of the game.
- ⏱️ **Timelock funds**: The wagered amount is secured by a timelock, to prevents ghosting by losing players.
- 🖼️ **Frontend**: Results are generated in the browser based on strategies.

## Contents

- [Contents](#contents)
- [Game flow](#game-flow)
- [Hackathon bounties](#deployed-contracts)
- [Links](#links)
- [Team](#team)

## Game flow

The game has 3 main steps:

### 1: proposeGame

To start a new game, a challenger calls this functions with 3 parameters:

- opponent (address): Address of the opponent
- wagerAmount (uint256): Amount to be wagered in gwei
- formation (uint256): Array of player_id's

This function creates a game object and stores it in a mapping by gameId. The formation is is stored privately in a seperate mapping.

### 2: acceptGame

To accept a game, an opponent calls this functions with 2 parameters:

- gameId (uint256): Unique id for the game
- formation (uint256): Array of player_id's
  This function publicly stored the opponent's formation in the games mapping.

### 3: revealOutcome

Challenger calls this function to settle a game. The function takes 1 input

- gameId (uint256): Unique id for the game

This function reveals challenger formation, determines the outcome and pays out the winner.

### 3b: revealOutcome

Opponent calls this function to settle a game if the challenger does not call revealOutcome within the timelimit. The function takes 1 input

- gameId (uint256): Unique id for the game

This function is only available after X blocks have passed since acceptGame was executed. It pays out the wagered amounts to the opponent, punishing the challenger for ghosting.

## Deployed contracts

- TEN deployed contract 0x492bD2595393678F4E7ef2a2D3136860D4d83378 in tx 0x651f86c420c77861bccc9e1f36eff6dcfaa3af4387fd0c0b9aa02c9402667c29
- [Scroll](https://sepolia.scrollscan.com/address/0xc54170C714FFd8944e78719C1D0B13C9968E4F32#code)
- [Linea](https://goerli.lineascan.build/address/address/0x1e61235A37ee5642d71c6c3f060b6E94b05EE6E7#code)
- [Optimism](https://sepolia-optimism.etherscan.io/address/0xab2EE87906222B433AF6836b1f1588b79294f67e)
- [Polygon zkEVM cardona](https://cardona-zkevm.polygonscan.com/address/0xab2EE87906222B433AF6836b1f1588b79294f67e)
- [Thundercore](https://explorer-testnet.thundercore.com/address/0xc314278217Ae8D99D95BdAb3432e174A1a483Ed1)

## Links

- [Github front-end repo](https://github.com/ethtaipei-footballmanager/frontend-taipei)
- [Github smart contract repo](https://github.com/ethtaipei-footballmanager/smartcontracts-taipei/)
- [Taikai](https://taikai.network/ethtaipei/hackathons/hackathon-2024/projects/clu3lzpn30igbw201tsucpoez)
- [Presentation video]()
- [Presentation slides](https://docs.google.com/presentation/d/1k6m42-y1edfHXn_txZ7uHJDuYUpOR82_3n5JufEhCzs/edit?usp=sharing)

## Team

This project was build at EthTaipei 2024 by:

- [arjanjohan](https://x.com/arjanjohan/)
- [Umut](http://x.com/nhestrompia)
