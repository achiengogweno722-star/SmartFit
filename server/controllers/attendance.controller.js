import {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance,
  getActiveMembers,
} from "../services/attendance.service.js";

export const checkInHandler = async (req, res) => {
  try {
    const attendance = await checkIn(req.user.id);

    res.status(201).json({
      success: true,
      message: "Checked in successfully.",
      attendance,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const checkOutHandler = async (req, res) => {
  try {
    const attendance = await checkOut(req.user.id);

    res.status(200).json({
      success: true,
      message: "Checked out successfully.",
      attendance,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const myAttendanceHandler = async (req, res) => {
  try {
    const attendance = await getMyAttendance(req.user.id);

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const allAttendanceHandler = async (req, res) => {
  try {
    const attendance = await getAllAttendance();

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const activeMembersHandler = async (req, res) => {
  try {
    const members = await getActiveMembers();

    res.status(200).json({
      success: true,
      count: members.length,
      members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};