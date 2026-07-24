import api from "../api/axios";

export const addProgressLog = async (progressData) => {
  const response = await api.post("/progress", progressData);
  return response.data;
};

export const getProgressLogs = async () => {
  const response = await api.get("/progress");
  return response.data;
};
