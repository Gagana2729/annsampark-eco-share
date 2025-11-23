import api from "./api";

export const getStats = async () => {
  const res = await api.get("/users/stats");
  return res.data;
};

export const getAllUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const getProfile = async () => {
  const res = await api.get("/users/profile");
  return res.data;
};

export default {
  getStats,
  getAllUsers,
  getProfile
};
