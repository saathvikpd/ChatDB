import React, { useState } from "react";
import { uploadDatabase, generateSQL } from "../api";

const QueryForm = ({ onSchema, onResults}) => {
  const [query, setQuery] = useState("");
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState("");

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadDatabase(formData);
      if (response.error) {
        alert(response.error);
      } else {
        setFilePath(response.file_path);
        alert("File uploaded successfully!");
        onSchema(response.schema);  // Pass schema data to the parent component
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload file. Please try again.");
    }
  };

  const handleGenerateSQL = async (e) => {
    e.preventDefault();
    if (!filePath) {
      alert("Please upload a database file first.");
      return;
    }

    const response = await generateSQL(query, filePath);
    onResults(response);
  };

  return (
    <div>
      <form onSubmit={handleFileUpload}>
        <label>Upload Database File (.db):</label>
        <input type="file" accept=".db" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>

      <form onSubmit={handleGenerateSQL}>
        <label>Enter your query in plain English:</label>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows="4"
        />
        <button type="submit">Generate SQL</button>
      </form>
    </div>
  );
};

export default QueryForm;


