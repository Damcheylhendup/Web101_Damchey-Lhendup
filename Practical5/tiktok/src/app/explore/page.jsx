"use client";

import { useEffect, useState } from "react";
import { getAllVideos } from "../../services/videoService";

export default function ExplorePage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getAllVideos()
      .then((data) => setVideos(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main style={{ padding: "25px" }}>
      <h1>Explore</h1>

      <h2>Trending Hashtags</h2>

      <div className="trending-grid">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div className="trend-card" key={item}>
            <h3>#Trending{item}</h3>
            <p>{item * 1.5}M views</p>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "35px" }}>Popular Videos</h2>

      <div className="popular-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <video width="100%" controls>
              <source src={video.videoUrl} type="video/mp4" />
            </video>

            <p>{video.title}</p>
            <p>@{video.username}</p>
            <p>{video.caption}</p>
          </div>
        ))}
      </div>
    </main>
  );
}