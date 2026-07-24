import {
  fetchNotifications,
  markNotificationAsRead,
  addNotification,
} from "../services/notification.service.js";

export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await fetchNotifications(req.user.id);

    res.status(200).json({
      success: true,
      notifications,
      count: notifications.length,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const notification = await markNotificationAsRead(
      req.user.id,
      Number(req.params.notificationId)
    );

    res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const createNotification = async (req, res) => {
  try {
    const notification = await addNotification(req.body);

    res.status(201).json({
      success: true,
      notification,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
