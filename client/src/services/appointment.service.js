import api from "../api/axios";

export const bookAppointment = async (appointmentData) => {
  const response = await api.post("/appointments", appointmentData);
  return response.data;
};

export const getMyAppointments = async () => {
  const response = await api.get("/appointments/member");
  return response.data;
};

export const getTrainerAppointments = async () => {
  const response = await api.get("/appointments/trainer");
  return response.data;
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  const response = await api.put(`/appointments/${appointmentId}/status`, { status });
  return response.data;
};
