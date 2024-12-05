import subprocess
import json
from config import XAI_API_KEY
import requests

def generate_sql_query(schema_context, user_input):
    prompt = f"Based on the provided database schema, convert the following request into an SQL query, and DO NOT explain your reasoning. ONLY output the SQL query: Database schema: {schema_context} User request: {user_input}. SQL query:"
    
    # Define the payload for the request
    payload = {
        "messages": [
            {
                "role": "system",
                "content": "You are an expert at SQL querying"
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        "model": "grok-beta",
        "max_tokens": 100,
        "stream": False,
        "temperature": 0
    }

    # Headers for the request
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {XAI_API_KEY}"
    }

    # Make the request to the API
    try:
        response = requests.post("https://api.x.ai/v1/chat/completions", headers=headers, json=payload)
        response.raise_for_status()  # Raise an exception if the request failed

        # Extract and return the SQL query from the response
        json_output = response.json()
        sql_query = json_output["choices"][0]["message"]["content"]
        sql_query = sql_query.replace("```sql", "")
        sql_query = sql_query.replace("```", "")
        return sql_query.strip(), ""

    except requests.exceptions.RequestException as e:
        print(f"Error making API request: {e}")
        return None

    # api_call = f"""curl https://api.x.ai/v1/chat/completions \
    # -H "Content-Type: application/json" \
    # -H "Authorization: Bearer {XAI_API_KEY}" \
    # -d '{{
    #     "messages": [
    #         {{
    #         "role": "system",
    #         "content": "You are an expert at SQL querying"
    #         }},
    #         {{
    #         "role": "user",
    #         "content": "Based on the provided database schema, convert the following request into an SQL query, and DO NOT explain your reasoning. ONLY output the SQL query: Database schema: {schema_context} User request: {user_input}. SQL query:"
    #         }}
    #     ],
    #     "model": "grok-beta",
    #     "max_tokens": 100,
    #     "stream": false,
    #     "temperature": 0
    #     }}'
    # """

    # with open("./run.sh", "+w") as f:
    #     f.write(api_call)

    # result0 = subprocess.run("chmod +x run.sh", shell=True, capture_output=True, text=True)

    

    # # Run the command and capture output
    # command = "sh run.sh"  # Replace with your desired command
    # result = subprocess.run(command, shell=True, capture_output=True, text=True)

    # # Check if the command was successful
    # if result.returncode == 0:
    #     # Parse the output as JSON (if it's valid JSON)
    #     # try:
    #     if True:
    #         json_output = json.loads(result.stdout)
    #         print(json_output["choices"][0]["message"]["content"])
    #     # except json.JSONDecodeError:
    #     #     print("Command output is not valid JSON.")
    # else:
    #     print("Command failed with error:", result.stderr)
    
    # # prompt = f"""
    # # You are a helpful assistant. Convert the following request into an SQL query:
    # # User request: "{user_input}"
    # # SQL query:
    # # """
    # # response = openai.Completion.create(
    # #     engine="text-davinci-003",  # Use GPT-4 equivalent API
    # #     prompt=prompt,
    # #     max_tokens=150
    # # )
    # # sql_query = response.choices[0].text.strip()

    # sql_query = json_output["choices"][0]["message"]["content"]
    # sql_query = sql_query.replace("```sql", "")
    # sql_query = sql_query.replace("```", "")
    # sql_query = sql_query.replace("\n", " ")
    
    # explanation = f"The query was generated to retrieve the required information as per the user's request: '{user_input}'."
    # return sql_query, explanation

def anchoring(schema_context, user_input, old_inputs):

    process_old_inputs = ", ".join(old_inputs)

    api_call = f"""curl https://api.x.ai/v1/chat/completions \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer {XAI_API_KEY}" \
    -d '{{
        "messages": [
            {{
            "role": "system",
            "content": "You are an expert at SQL querying"
            }},
            {{
            "role": "user",
            "content": "The list of old queries are invalid. Generate a correct query, STRICTLY different from the old queries, for the given user request and database schema. Output ONLY the SQL query, no reasoning: Database schema: {schema_context} User request: {user_input}. Old queries: {process_old_inputs} SQL query:"
            }}
        ],
        "model": "grok-beta",
        "max_tokens": 100,
        "stream": false,
        "temperature": 0
        }}'
    """

    with open("./run.sh", "+w") as f:
        f.write(api_call)

    result0 = subprocess.run("chmod +x run.sh", shell=True, capture_output=True, text=True)

    

    # Run the command and capture output
    command = "sh run.sh"  # Replace with your desired command
    result = subprocess.run(command, shell=True, capture_output=True, text=True)

    # Check if the command was successful
    if result.returncode == 0:
        # Parse the output as JSON (if it's valid JSON)
        # try:
        if True:
            json_output = json.loads(result.stdout)
            print(json_output["choices"][0]["message"]["content"])
        # except json.JSONDecodeError:
        #     print("Command output is not valid JSON.")
    else:
        print("Command failed with error:", result.stderr)
    
    # prompt = f"""
    # You are a helpful assistant. Convert the following request into an SQL query:
    # User request: "{user_input}"
    # SQL query:
    # """
    # response = openai.Completion.create(
    #     engine="text-davinci-003",  # Use GPT-4 equivalent API
    #     prompt=prompt,
    #     max_tokens=150
    # )
    # sql_query = response.choices[0].text.strip()

    sql_query = json_output["choices"][0]["message"]["content"]
    sql_query = sql_query.replace("```sql", "")
    sql_query = sql_query.replace("```", "")
    
    explanation = f"The query was generated to retrieve the required information as per the user's request: '{user_input}'."
    return sql_query.strip(), explanation

