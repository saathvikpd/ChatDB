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

def anchoring(schema_context, user_input, old_inputs):

    process_old_inputs = ", ".join(old_inputs)

    prompt = f"The list of old queries are invalid. Generate a correct query, STRICTLY different from the old queries, for the given user request and database schema. Output ONLY the SQL query, no reasoning: Database schema: {schema_context} User request: {user_input}. Old queries: {process_old_inputs} SQL query:"

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
