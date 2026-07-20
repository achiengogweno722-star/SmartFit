import api from "../api/axios";

export const getNutritionRecommendations = async () => {
  const response = await api.get("/nutrition-recommendations");
  return response.data;
};