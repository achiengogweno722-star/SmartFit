import api from "../api/axios";

export const subscribeMembership = async (membershipData) => {
  const response = await api.post("/memberships/subscribe", membershipData);
  return response.data;
};

export const getMyMembership = async () => {
  const response = await api.get("/memberships/my");
  return response.data;
};

export const getAllMemberships = async () => {
  const response = await api.get("/memberships");
  return response.data;
};
