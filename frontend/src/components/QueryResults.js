import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

const QueryResults = ({ results }) => {
  if (!results) {
    return null; // Don't render anything if there are no results
  }

  const { sql_query, results: data } = results;

  return (
    <Box mt={4}>
      <Card elevation={3}>
        <CardContent>
          {/* SQL Query Section */}
          <Typography variant="h5" gutterBottom>
            Generated SQL Query:
          </Typography>
          <Box mb={3} p={2} sx={{ backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
            <Typography variant="body1" component="pre">
              {sql_query}
            </Typography>
          </Box>

          {/* Results Table Section */}
          <Typography variant="h5" gutterBottom>
            Query Results:
          </Typography>

          {data && data.length > 0 ? (
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {Object.keys(data[0]).map((key) => (
                      <TableCell key={key} align="left">
                        <Typography variant="subtitle1" fontWeight="bold">
                          {key}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={index}>
                      {Object.keys(row).map((key, idx) => (
                        <TableCell key={idx} align="left">
                          <Typography variant="body2">
                            {row[key]}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No results found.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default QueryResults;



