import React, { useState } from "react";
import { uploadDatabase, generateSQL } from "../api";
import "../styles.css";

const QueryForm = ({ onSchema, onResults }) => {
  const [query, setQuery] = useState("");
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      const response = await uploadDatabase(formData);
      setLoading(false);
      if (response.error) {
        alert(response.error);
      } else {
        setFilePath(response.file_path);
        onSchema(response.schema);
        alert("File uploaded successfully!");
      }
    } catch (error) {
      setLoading(false);
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

    setLoading(true);
    try {
      const response = await generateSQL(query, filePath);
      setLoading(false);
      onResults(response);
    } catch (error) {
      setLoading(false);
      console.error("Query generation failed:", error);
      alert("Failed to generate query. Please try again.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleFileUpload}>
        <h2>Upload Database File (.db)</h2>
        <input type="file" accept=".db" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <form onSubmit={handleGenerateSQL}>
        <h2>Enter Your Query in Plain English</h2>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows="4"
          placeholder="E.g., Show all customers with orders greater than $100"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Generating SQL..." : "Generate SQL"}
        </button>
      </form>
    </div>
  );
};

export default QueryForm;
