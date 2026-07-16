import { getDashboardStatistics } from "../services/adminDashboard.service.js";

// Get Admin Dashboard
export const getDashboard = async (req, res) => {
  try {
    const dashboard = await getDashboardStatistics();

    res.status(200).json({
      success: true,
      dashboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};