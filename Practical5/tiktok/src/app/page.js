"use client";

import { useEffect, useState } from "react";
import { getAllVideos } from "../services/videoService";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllVideos()
      .then((data) => setVideos(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>TikTok Videos</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {videos.length === 0 && !error && <p>No videos found</p>}

      {videos.map((video) => (
        <div key={video.id} style={{ marginBottom: "30px" }}>
          <video width="350" controls>
            <source src={video.videoUrl} type="video/mp4" />
          </video>

          <h3>{video.title}</h3>
          <p>@{video.username}</p>
          <p>{video.caption}</p>
        </div>
      ))}
    </main>
  );
}