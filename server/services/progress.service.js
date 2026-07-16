import prisma from "../config/prisma.js";

// Add a Progress Log
export const addProgressLog = async (userId, data) => {
  // Find the member profile
  const member = await prisma.memberProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!member) {
    throw new Error("Member profile not found.");
  }

  // Convert height from cm to meters
const heightInMeters = member.height / 100;

// Calculate BMI
const bmi = Number(
  (data.weight / (heightInMeters * heightInMeters)).toFixed(2)
);

  // Save progress log
  const progress = await prisma.progressLog.create({
    data: {
      memberId: member.id,
      weight: data.weight,
      bmi,
      notes: data.notes,
    },
  });

  // Update member's current weight and BMI
  await prisma.memberProfile.update({
    where: {
      id: member.id,
    },
    data: {
      weight: data.weight,
      bmi,
    },
  });

  return progress;
};

// Get Progress History
export const getProgressHistory = async (userId) => {
  const member = await prisma.memberProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!member) {
    throw new Error("Member profile not found.");
  }

  return await prisma.progressLog.findMany({
    where: {
      memberId: member.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};