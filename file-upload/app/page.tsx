"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const validateFile = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      return "Only JPG, PNG, and PDF files are allowed.";
    }

    if (file.size > maxSize) {
      return "File size must be less than 2MB.";
    }

    return null;
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      setMessage(error);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setMessage(`File selected: ${file.name}`);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      setMessage(error);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setMessage(`File selected: ${file.name}`);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploadProgress(0);

      const response = await axios.post("http://localhost:8000/api/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total || 1;
          const percent = Math.round((progressEvent.loaded * 100) / total);
          setUploadProgress(percent);
        },
      });

      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Upload failed.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>File Upload App</h1>

        <div {...getRootProps()} style={styles.dropzone}>
          <input {...getInputProps()} />
          <p>Drag and drop a file here, or click to select</p>
        </div>

        <input type="file" onChange={handleFileChange} style={styles.input} />

        <button onClick={handleUpload} style={styles.button}>
          Upload File
        </button>

        {uploadProgress > 0 && (
          <div style={{ marginTop: "20px", width: "100%" }}>
            <p style={{ color: "#333" }}>Upload Progress: {uploadProgress}%</p>
            <progress value={uploadProgress} max="100" style={{ width: "100%" }} />
          </div>
        )}

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f4f4f4",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "420px",
    textAlign: "center",
    color: "#000",
  },
  heading: {
    marginBottom: "20px",
    color: "#111",
  },
  dropzone: {
    border: "2px dashed #555",
    padding: "30px",
    marginBottom: "20px",
    cursor: "pointer",
    borderRadius: "10px",
    backgroundColor: "#fafafa",
    color: "#333",
  },
  input: {
    marginTop: "10px",
    marginBottom: "20px",
    color: "#111",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  message: {
    marginTop: "20px",
    fontWeight: "bold",
    color: "green",
  },
};