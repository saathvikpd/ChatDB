import React, { useState } from "react";
import QueryForm from "./components/QueryForm";
import QueryResults from "./components/QueryResults";

function App() {
  const [schema, setSchema] = useState(null);
  const [results, setResults] = useState(null);

  const handleSchema = (uploadedSchema) => {
    console.log("Received schema:", uploadedSchema);
    setSchema(uploadedSchema); // Update state with the uploaded schema
  };

  // console.log("Current schema state:", schema);

  return (
    <div>
      <h1>Interactive SQL Query Generator</h1>
      <QueryForm onSchema={handleSchema} onResults={setResults} />
      {schema && (
        <div>
          <h2>Database Schema</h2>
          <ul>
            {Object.entries(schema).map(([table, columns]) => (
              <li key={table}>
                <strong>{table}</strong>
                <ul>
                  {columns.map((column) => (
                    <li key={column}>{column}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
      <QueryResults results={results} />
    </div>
  );
}

export default App;

