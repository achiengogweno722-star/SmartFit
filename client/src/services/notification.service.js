import api from "../api/axios";

export const getMyNotifications = async () => {
  const response = await api.get("/notifications/my");
  return response.data;
};

export const markNotificationRead = async (notificationId) => {
  const response = await api.put(`/notifications/${notificationId}/read`);
  return response.data;
};

export const createNotification = async (notificationData) => {
  const response = await api.post("/notifications", notificationData);
  return response.data;
};
