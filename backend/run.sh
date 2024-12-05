curl https://api.x.ai/v1/chat/completions     -H "Content-Type: application/json"     -H "Authorization: Bearer xai-IWDeHQuxQqHpju5nrFe7yIwqYn73zeAMSsV3IgSczNem4b4YfD2CWTZd5AlqQorcmcsUw0vBUYEa49lz"     -d '{
        "messages": [
            {
            "role": "system",
            "content": "You are an expert at SQL querying"
            },
            {
            "role": "user",
            "content": "The list of old queries are invalid. Generate a correct query, STRICTLY different from the old queries, for the given user request. Output ONLY the SQL query, no reasoning: User request: Show all flights in April. Old queries:  SELECT * FROM flights WHERE EXTRACT(MONTH FROM departure_date) = 4; ,  SELECT * FROM flights WHERE departure_date BETWEEN '2023-04-01' AND '2023-04-30'; ,  SELECT * FROM flights WHERE departure_date >= '2023-04-01' AND departure_date < '2023-05-01'; ,  SELECT * FROM flights WHERE MONTH(departure_date) = 4;  SQL query:"
            }
        ],
        "model": "grok-beta",
        "max_tokens": 100,
        "stream": false,
        "temperature": 0
        }'
    