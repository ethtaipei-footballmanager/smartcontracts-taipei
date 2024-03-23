import pandas as pd

def convert_csv_to_json(csv_file_path, json_file_path):
    # Read the CSV data
    df = pd.read_csv(csv_file_path)

    # Filter out the row with EMPTY_PLAYER or any invalid player_uid
    df_filtered = df[df['player_uid'] != 0]

    # Convert the filtered DataFrame to the desired JSON format
    json_output = [
        f"{{ player_uid: {row.player_uid}, team_id: {row.team_id}, position: {row.position}, attack: {row.attack}, defense: {row.defense}, speed: {row.speed}, power: {row.power}, stamina: {row.stamina}, technique: {row.technique}, goalkeeping: {row.goalkeeping} }}"
        for index, row in df_filtered.iterrows()
    ]

    # Convert the list to a JSON-like string
    json_output_str = ",\n".join(json_output)

    # Write the JSON string to a file
    with open(json_file_path, 'w') as file:
        file.write(json_output_str)

# Usage example
csv_file_path = 'players_final_u8.csv'
json_file_path = 'players_data.json'
convert_csv_to_json(csv_file_path, json_file_path)