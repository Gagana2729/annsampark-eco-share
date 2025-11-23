import api from "./api";

export const getAllDonations = async () => {
  const res = await api.get("/donations");
  return res.data;
};

export const getMyDonations = async () => {
  const res = await api.get("/donations/my/donations");
  return res.data;
};

export const createDonation = async (data) => {
  const res = await api.post("/donations", data);
  return res.data;
};

export const requestDonation = async (donationId) => {
  const res = await api.post(`/donations/request/${donationId}`);
  return res.data;
};

export const deleteDonation = async (donationId) => {
  const res = await api.delete(`/donations/${donationId}`);
  return res.data;
};

export default {
  getAllDonations,
  getMyDonations,
  createDonation,
  requestDonation,
  deleteDonation
};
