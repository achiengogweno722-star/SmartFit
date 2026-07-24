import { createQRCode, fetchMyQRCodes } from "../services/qr.service.js";

export const generateQRCode = async (req, res) => {
  try {
    const qr = await createQRCode(req.user.id);

    res.status(201).json({
      success: true,
      qr,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyQRCodes = async (req, res) => {
  try {
    const codes = await fetchMyQRCodes(req.user.id);

    res.status(200).json({
      success: true,
      count: codes.length,
      codes,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
