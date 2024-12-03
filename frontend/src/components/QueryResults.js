import React from "react";

const QueryResults = ({ results }) => {
  if (!results) return null;

  return (
    <div>
      <h3>SQL Query</h3>
      <pre>{results.sql_query}</pre>
      <h3>Explanation</h3>
      <p>{results.explanation}</p>
      <h3>Results</h3>
      <pre>{JSON.stringify(results.results, null, 2)}</pre>
    </div>
  );
};

export default QueryResults;
