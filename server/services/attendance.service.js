import prisma from "../config/prisma.js";

// Member Check In
export const checkIn = async (userId) => {
  const member = await prisma.memberProfile.findUnique({
    where: { userId },
  });

  if (!member) {
    throw new Error("Member profile not found.");
  }

  const existingAttendance = await prisma.attendance.findFirst({
    where: {
      memberId: member.id,
      checkOut: null,
    },
  });

  if (existingAttendance) {
    throw new Error("You are already checked in.");
  }

  return await prisma.attendance.create({
    data: {
      memberId: member.id,
    },
  });
};

// Member Check Out
export const checkOut = async (userId) => {
  const member = await prisma.memberProfile.findUnique({
    where: { userId },
  });

  if (!member) {
    throw new Error("Member profile not found.");
  }

  const attendance = await prisma.attendance.findFirst({
    where: {
      memberId: member.id,
      checkOut: null,
    },
  });

  if (!attendance) {
    throw new Error("No active check-in found.");
  }

  return await prisma.attendance.update({
    where: {
      id: attendance.id,
    },
    data: {
      checkOut: new Date(),
    },
  });
};

// Member Attendance History
export const getMyAttendance = async (userId) => {
  const member = await prisma.memberProfile.findUnique({
    where: { userId },
  });

  if (!member) {
    throw new Error("Member profile not found.");
  }

  return await prisma.attendance.findMany({
    where: {
      memberId: member.id,
    },
    orderBy: {
      checkIn: "desc",
    },
  });
};

// Admin/Trainer
export const getAllAttendance = async () => {
  return await prisma.attendance.findMany({
    include: {
      member: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      checkIn: "desc",
    },
  });
};

// Members currently inside the gym
export const getActiveMembers = async () => {
  return await prisma.attendance.findMany({
    where: {
      checkOut: null,
    },
    include: {
      member: {
        include: {
          user: true,
        },
      },
    },
  });
};