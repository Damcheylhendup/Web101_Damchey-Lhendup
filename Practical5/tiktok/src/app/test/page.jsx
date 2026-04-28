"use client";

import { useEffect, useState } from "react";

export default function TestPage() {
  const [message, setMessage] = useState("Checking connection...");

  useEffect(() => {
    fetch("http://127.0.0.1:5000")
      .then((res) => res.text())
      .then((data) => setMessage(`Connected: ${data}`))
      .catch((err) => setMessage(`Not connected: ${err.message}`));
  }, []);

  return (
    <div style={{ padding: "20px", fontSize: "20px" }}>
      <h1>Backend Test</h1>
      <p>{message}</p>
    </div>
  );
}