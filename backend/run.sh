curl https://api.x.ai/v1/chat/completions     -H "Content-Type: application/json"     -H "Authorization: Bearer xai-IWDeHQuxQqHpju5nrFe7yIwqYn73zeAMSsV3IgSczNem4b4YfD2CWTZd5AlqQorcmcsUw0vBUYEa49lz"     -d '{
        "messages": [
            {
            "role": "system",
            "content": "You are an expert at SQL querying"
            },
            {
            "role": "user",
            "content": "Based on the provided database schema, convert the following request into an SQL query, and DO NOT explain your reasoning. ONLY output the SQL query: Database schema: {"CARRIERS": ["cid", "name"], "MONTHS": ["mid", "month"], "WEEKDAYS": ["did", "day_of_week"], "FLIGHTS": ["fid", "month_id", "day_of_month", "day_of_week_id", "carrier_id", "flight_num", "origin_city", "origin_state", "dest_city", "dest_state", "departure_delay", "taxi_out", "arrival_delay", "canceled", "actual_time", "distance", "capacity", "price"]} User request: display flights in April. SQL query:"
            }
        ],
        "model": "grok-beta",
        "max_tokens": 100,
        "stream": false,
        "temperature": 0
        }'
    