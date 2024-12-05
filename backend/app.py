import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from werkzeug.utils import secure_filename
from utils import generate_sql_query, anchoring
from config import ANCHOR_TOL
import json

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'db'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Extract schema details from the database
        try:
            connection = sqlite3.connect(file_path)
            cursor = connection.cursor()

            # Get a list of tables
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
            tables = cursor.fetchall()
            schema = {}

            # For each table, get its columns
            for (table_name,) in tables:
                cursor.execute(f"PRAGMA table_info({table_name});")
                columns = cursor.fetchall()
                schema[table_name] = [column[1] for column in columns]  # Extract column names

            connection.close()
            with open("./schema.txt", "+w") as f:
                f.write(json.dumps(schema))
            return jsonify({
                'message': 'File uploaded successfully',
                'file_path': file_path,
                'schema': schema  # Send schema back to the frontend
            }), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    return jsonify({'error': 'Invalid file type. Only .db files are allowed.'}), 400



@app.route('/generate-sql', methods=['POST'])
def generate_sql():
    data = request.json
    user_input = data.get('query', '')
    file_path = data.get('file_path', '')

    if not user_input or not file_path:
        return jsonify({"error": "Query and file path are required"}), 400
    
    with open("./schema.txt", "r") as f:
        schema_context = f.read()
        
    # Connect to the uploaded database
    if True:
        connection = sqlite3.connect(file_path)
        cursor = connection.cursor()

        # Generate SQL query (use your GPT-4 integration here)
        sql_query, explanation = generate_sql_query(schema_context, user_input)  # Example static query; replace with GPT-4 logic

        stop = False

        try:
            cursor.execute(sql_query)
            results = cursor.fetchall()
            stop = True
        except:
            old_inputs = {sql_query.replace("\n", " ")}
            i = 1
            while not stop and i < ANCHOR_TOL:
                sql_query, explanation = anchoring(schema_context, user_input, old_inputs)
                
                try:
                    cursor.execute(sql_query)
                    results = cursor.fetchall()
                    stop = True
                except:
                    pass

                old_inputs = old_inputs.union({sql_query.replace("\n", " ")})
                i += 1
                 
        connection.close()

        if not stop:
            sql_query = "None"
            results = {}

        return jsonify({
            "sql_query": sql_query,
            "results": results
        })
    # except Exception as e:
    #     return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
