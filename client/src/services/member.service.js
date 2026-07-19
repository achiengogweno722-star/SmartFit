import api from "../api/axios";

export const saveProfile = async (profileData) => {
  const response = await api.post("/member/profile", profileData);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/member/profile");
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put("/member/profile", profileData);
  return response.data;
};