export const uploadDatabase = async (formData) => {
    const response = await fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: formData,
    });
    return response.json();
};
  
export const generateSQL = async (query, filePath) => {
const response = await fetch("http://127.0.0.1:5000/generate-sql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, file_path: filePath }),
});
return response.json();
};
  