import prisma from "../config/prisma.js";

// ===============================
// Create Trainer Profile
// ===============================
export const createTrainerProfile = async (userId, data) => {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  // Ensure user is a trainer
  if (user.role !== "TRAINER") {
    throw new Error(
      "Only users with the TRAINER role can create a trainer profile."
    );
  }

  // Prevent duplicate profiles
  const existingProfile = await prisma.trainerProfile.findUnique({
    where: {
      userId,
    },
  });

  if (existingProfile) {
    throw new Error("Trainer profile already exists.");
  }

  // Create profile
  const trainer = await prisma.trainerProfile.create({
    data: {
      userId,
      specialization: data.specialization,
      experience: data.experience,
      phoneNumber: data.phoneNumber,
    },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
        },
      },
    },
  });

  return trainer;
};

// ===============================
// Get All Trainers
// ===============================
export const getAllTrainers = async () => {
  return await prisma.trainerProfile.findMany({
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};