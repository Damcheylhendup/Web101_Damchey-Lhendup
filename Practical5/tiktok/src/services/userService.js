import api from "@/lib/api-config";

export const getAllUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const getUserProfile = async (userId) => {
  const res = await api.get(`/users/${userId}`);
  return res.data;
};

export const followUser = async (userId) => {
  const res = await api.post(`/users/${userId}/follow`);
  return res.data;
};

export const unfollowUser = async (userId) => {
  const res = await api.delete(`/users/${userId}/follow`);
  return res.data;
};