// import React, { useState } from "react";
// import QueryForm from "./components/QueryForm";
// import QueryResults from "./components/QueryResults";

// function App() {
//   const [schema, setSchema] = useState(null);
//   const [results, setResults] = useState(null);

//   const handleSchema = (uploadedSchema) => {
//     console.log("Received schema:", uploadedSchema);
//     setSchema(uploadedSchema); // Update state with the uploaded schema
//   };

//   // console.log("Current schema state:", schema);

//   return (
//     <div>
//       <h1>Interactive SQL Query Generator</h1>
//       <QueryForm onSchema={handleSchema} onResults={setResults} />
//       {schema && (
//         <div>
//           <h2>Database Schema</h2>
//           <ul>
//             {Object.entries(schema).map(([table, columns]) => (
//               <li key={table}>
//                 <strong>{table}</strong>
//                 <ul>
//                   {columns.map((column) => (
//                     <li key={column}>{column}</li>
//                   ))}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       <QueryResults results={results} />
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import QueryForm from "./components/QueryForm";
import QueryResults from "./components/QueryResults";
import { Container, Typography, Paper, Box } from "@mui/material";

function App() {
  const [schema, setSchema] = useState(null);
  const [results, setResults] = useState(null);

  const handleSchema = (uploadedSchema) => {
    console.log("Received schema:", uploadedSchema);
    setSchema(uploadedSchema); // Update state with the uploaded schema
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Interactive SQL Query Generator
          </Typography>
          <QueryForm onSchema={handleSchema} onResults={setResults} />
          {schema && (
            <Box mt={4}>
              <Typography variant="h5" gutterBottom>
                Database Schema
              </Typography>
              {Object.entries(schema).map(([table, columns]) => (
                <Box key={table} mb={2}>
                  <Typography variant="h6">{table}</Typography>
                  <ul>
                    {columns.map((column) => (
                      <li key={column}>
                        <Typography>{column}</Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              ))}
            </Box>
          )}
          {results && (
            <Box mt={4}>
              <QueryResults results={results} />
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
