from web3 import Web3
import csv
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Connect to Ethereum node
web3 = Web3(Web3.HTTPProvider(os.getenv('NODE_URL')))

# Ensure connection is successful
if not web3.isConnected():
    print("Failed to connect to Ethereum node.")
    exit()

# Contract details
contract_address = os.getenv('CONTRACT_ADDRESS')
contract_abi = os.getenv('CONTRACT_ABI')

# Create contract instance
contract = web3.eth.contract(address=contract_address, abi=contract_abi)

# Account details
account = os.getenv('ACCOUNT_ADDRESS')
private_key = os.getenv('PRIVATE_KEY')

# Reading the CSV file
with open('players.csv', mode='r') as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        # Parse player data
        playerId = int(row['player_uid'])
        teamId = int(row['team_id'])
        position = int(row['position'])
        attack = int(row['attack'])
        defense = int(row['defense'])
        speed = int(row['speed'])
        power = int(row['power'])
        stamina = int(row['stamina'])
        technique = int(row['technique'])
        goalkeeping = int(row['goalkeeping'])

        # Prepare transaction
        tx = contract.functions.addPlayer(
            playerId,
            teamId,
            position,
            attack,
            defense,
            speed,
            power,
            stamina,
            technique,
            goalkeeping
        ).buildTransaction({
            'chainId': web3.eth.chain_id,
            'gas': 70000,  # Adjust based on your contract's requirements
            'gasPrice': web3.eth.gas_price,
            'nonce': web3.eth.getTransactionCount(account),
        })

        # Sign and send transaction
        signed_tx = web3.eth.account.sign_transaction(tx, private_key)
        tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)

        # Wait for the transaction to be mined
        web3.eth.wait_for_transaction_receipt(tx_hash)

        print(f"Player {playerId} added to the contract.")
