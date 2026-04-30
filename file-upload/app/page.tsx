"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please choose a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      setMessage("Upload successful.");
    } catch (error) {
      console.log(error);
      setMessage("Upload failed. Check backend server.");
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#eeeeee",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
      }}
    >
      <div
        style={{
          width: "420px",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          color: "black",
          opacity:1
        }}
      >
        <h2 style={{ color: "black" }}>File Upload App</h2>

        <label
          style={{
            display: "block",
            border: "2px dashed #555",
            padding: "35px",
            margin: "25px 0",
            cursor: "pointer",
            color: "black",
          }}
        >
          {file ? file.name : "Drag and drop a file here, or click to select"}

          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>

        <button
          onClick={handleUpload}
          style={{
            padding: "12px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Upload File
        </button>

        {message && (
          <p
            style={{
              marginTop: "20px",
              fontWeight: "bold",
              color: message.includes("successful") ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </main>
  );
}