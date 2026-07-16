import prisma from "../config/prisma.js";

// Create Member Profile
export const createMemberProfile = async (userId, data) => {
  // Check if profile already exists
  const existingProfile = await prisma.memberProfile.findUnique({
    where: {
      userId,
    },
  });

  if (existingProfile) {
    throw new Error("Member profile already exists.");
  }

  // Convert height from cm to meters
  const heightInMeters = data.height / 100;

  // Calculate BMI
  const bmi = Number(
    (data.weight / (heightInMeters * heightInMeters)).toFixed(2)
  );

  const profile = await prisma.memberProfile.create({
    data: {
      userId,
      gender: data.gender,
      dateOfBirth: new Date(data.dateOfBirth),
      height: data.height,
      weight: data.weight,
      fitnessLevel: data.fitnessLevel,
      fitnessGoal: data.fitnessGoal,
      availableDaysPerWeek: data.availableDaysPerWeek,
      preferredWorkoutTime: data.preferredWorkoutTime,
      medicalConditions: data.medicalConditions,
      phoneNumber: data.phoneNumber,
      address: data.address,
      emergencyContact: data.emergencyContact,
      bmi,
    },
  });

  return profile;
};

// Get Member Profile
export const getMemberProfile = async (userId) => {
  const profile = await prisma.memberProfile.findUnique({
    where: {
      userId,
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
      trainer: {
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
      },
      workoutPlan: true,
    },
  });

  if (!profile) {
    throw new Error("Member profile not found.");
  }

  return profile;
};

// Update Member Profile
export const updateMemberProfile = async (userId, data) => {
  // Find existing profile
  const existingProfile = await prisma.memberProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!existingProfile) {
    throw new Error("Member profile not found.");
  }

  // Keep existing values if not provided
  const height = data.height ?? existingProfile.height;
  const weight = data.weight ?? existingProfile.weight;

  // Convert height from cm to meters
  const heightInMeters = height / 100;

  // Calculate BMI
  const bmi = Number(
    (weight / (heightInMeters * heightInMeters)).toFixed(2)
  );

  // Update profile
  const updatedProfile = await prisma.memberProfile.update({
    where: {
      userId,
    },
    data: {
      ...data,
      dateOfBirth: data.dateOfBirth
        ? new Date(data.dateOfBirth)
        : existingProfile.dateOfBirth,
      bmi,
    },
  });

  return updatedProfile;
};

// Assign Trainer to Member
export const assignTrainer = async (memberId, trainerId) => {
  // Check if member exists
  const member = await prisma.memberProfile.findUnique({
    where: {
      id: memberId,
    },
  });

  if (!member) {
    throw new Error("Member profile not found.");
  }

  // Check if trainer exists
  const trainer = await prisma.trainerProfile.findUnique({
    where: {
      id: trainerId,
    },
  });

  if (!trainer) {
    throw new Error("Trainer profile not found.");
  }

  // Assign trainer
  const updatedMember = await prisma.memberProfile.update({
    where: {
      id: memberId,
    },
    data: {
      trainerId,
    },
    include: {
      trainer: {
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return updatedMember;
};