"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Checking connection...");

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.text())
      .then((data) => {
        console.log("✅ Connected:", data);
        setMessage(data);
      })
      .catch((err) => {
        console.log("❌ Not connected:", err);
        setMessage("Not connected");
      });
  }, []);

  return (
    <div>
      <h1>Backend Test</h1>
      <p>{message}</p>
    </div>
  );
}