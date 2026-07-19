import api from "../api/axios";

export const getRecommendations = async (memberId) => {
  const response = await api.get(`/recommendation/${memberId}`);
  return response.data;
};