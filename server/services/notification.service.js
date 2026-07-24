import prisma from "../config/prisma.js";

export const fetchNotifications = async (userId) => {
  const member = await prisma.memberProfile.findUnique({
    where: { userId },
  });

  if (!member) {
    throw new Error("Member profile not found.");
  }

  return await prisma.notification.findMany({
    where: {
      memberId: member.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const markNotificationAsRead = async (userId, notificationId) => {
  const member = await prisma.memberProfile.findUnique({
    where: { userId },
  });

  if (!member) {
    throw new Error("Member profile not found.");
  }

  const notification = await prisma.notification.findUnique({
    where: {
      id: notificationId,
    },
  });

  if (!notification || notification.memberId !== member.id) {
    throw new Error("Notification not found.");
  }

  return await prisma.notification.update({
    where: {
      id: notificationId,
    },
    data: {
      read: true,
    },
  });
};

export const addNotification = async (data) => {
  if (!data.memberId || !data.title || !data.message) {
    throw new Error("memberId, title, and message are required.");
  }

  return await prisma.notification.create({
    data: {
      memberId: data.memberId,
      type: data.type || "INFO",
      title: data.title,
      message: data.message,
    },
  });
};
