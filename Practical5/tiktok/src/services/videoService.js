import api from "@/lib/api-config";

export const getAllVideos = async () => {
  const res = await fetch("http://localhost:5000/api/videos");

  if (!res.ok) {
    throw new Error("Failed to fetch videos");
  }
  
  return res.json();
};

export const getFollowingVideos = async () => {
  const res = await api.get("/videos/following");
  return res.data;
};

export const likeVideo = async (videoId) => {
  const res = await api.post(`/videos/${videoId}/like`);
  return res.data;
};

export const unlikeVideo = async (videoId) => {
  const res = await api.delete(`/videos/${videoId}/like`);
  return res.data;
};

export const uploadVideo = async (formData) => {
  const res = await api.post("/videos/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};