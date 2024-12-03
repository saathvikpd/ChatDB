curl https://api.x.ai/v1/chat/completions     -H "Content-Type: application/json"     -H "Authorization: Bearer xai-IWDeHQuxQqHpju5nrFe7yIwqYn73zeAMSsV3IgSczNem4b4YfD2CWTZd5AlqQorcmcsUw0vBUYEa49lz"     -d '{
        "messages": [
            {
            "role": "system",
            "content": "You are an expert at SQL querying"
            },
            {
            "role": "user",
            "content": "Convert the following request into an SQL query, and DO NOT explain your reasoning. ONLY output the SQL query: User request: find the average price per origin_city in flights. SQL query:"
            }
        ],
        "model": "grok-beta",
        "max_tokens": 100,
        "stream": false,
        "temperature": 0
        }'
    