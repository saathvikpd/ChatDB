// GPT-generated file

import React, { useState } from "react";
import QueryForm from "./components/QueryForm";
import QueryResults from "./components/QueryResults";
import { Container, Grid, Box, Typography, Card, CardContent } from "@mui/material";

function App() {
  const [schema, setSchema] = useState(null);
  const [results, setResults] = useState(null);

  const handleSchema = (uploadedSchema) => {
    console.log("Received schema:", uploadedSchema);
    setSchema(uploadedSchema); // Update state with the uploaded schema
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        {/* Query Form and Results Section */}
        <Grid item xs={12} md={7}>
          <Box mt={2}>
            <QueryForm onSchema={handleSchema} onResults={setResults} />
          </Box>
          <Box>
            {results && (
              <Box mt={4} sx={{ paddingLeft: 3, paddingRight: 3 }}>
                <QueryResults results={results} />
              </Box>
            )}
          </Box>
        </Grid>

        {/* Database Schema Section */}
        <Grid item xs={12} md={5}>
          <Box mt={2}>
            {schema && (
              <Card elevation={3}>
                <CardContent sx={{ paddingLeft: 3, paddingRight: 3, paddingTop: 2, paddingBottom: 2 }}>
                  <Typography variant="h5" gutterBottom>
                    Database Schema
                  </Typography>
                  <Grid container spacing={1}>
                    {Object.entries(schema).map(([table, columns]) => (
                      <Grid item xs={12} key={table}>
                        <Typography variant="h6" gutterBottom>
                          {table}
                        </Typography>
                        <Box pl={2}>
                          {columns.map((column) => (
                            <Typography key={column} variant="body2" color="textSecondary">
                              - {column}
                            </Typography>
                          ))}
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
