import api from "../api/axios";

export const generateQrCode = async () => {
  const response = await api.post("/qr/generate");
  return response.data;
};

export const getMyQrCodes = async () => {
  const response = await api.get("/qr/my");
  return response.data;
};
