import api from "../api/axios";

export const checkIn = async () => {
  const response = await api.post("/attendance/check-in");
  return response.data;
};

export const checkOut = async () => {
  const response = await api.put("/attendance/check-out");
  return response.data;
};

export const getMyAttendance = async () => {
  const response = await api.get("/attendance/my-history");
  return response.data;
};

export const getActiveMembers = async () => {
  const response = await api.get("/attendance/active");
  return response.data;
};
