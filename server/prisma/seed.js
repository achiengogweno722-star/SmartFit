import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.recommendation.deleteMany();
  await prisma.memberProfile.deleteMany();
  await prisma.trainerProfile.deleteMany();
  await prisma.workoutPlan.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin
  const admin = await prisma.user.create({
    data: {
      fullName: "System Admin",
      email: "admin@smartfit.com",
      password: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
    },
  });

  // Create Trainer
  const trainerUser = await prisma.user.create({
    data: {
      fullName: "John Trainer",
      email: "trainer@smartfit.com",
      password: await bcrypt.hash("trainer123", 10),
      role: "TRAINER",
    },
  });

  const trainer = await prisma.trainerProfile.create({
    data: {
      userId: trainerUser.id,
      specialization: "Weight Loss",
      experience: 5,
      phoneNumber: "0700000000",
    },
  });

  // Create Member
  const memberUser = await prisma.user.create({
    data: {
      fullName: "Jane Member",
      email: "member@smartfit.com",
      password: await bcrypt.hash("member123", 10),
      role: "MEMBER",
    },
  });

  await prisma.memberProfile.create({
    data: {
      userId: memberUser.id,
      gender: "FEMALE",
      dateOfBirth: new Date("2000-05-15"),
      height: 165,
      weight: 75,
      bmi: 27.5,
      fitnessLevel: "BEGINNER",
      fitnessGoal: "WEIGHT_LOSS",
      availableDaysPerWeek: 4,
      preferredWorkoutTime: "Morning",
      trainerId: trainer.id,
    },
  });

  // Workout Plan 1
  await prisma.workoutPlan.create({
    data: {
      name: "Beginner Weight Loss",
      description: "Perfect for beginners who want to lose weight.",
      category: "Cardio",
      targetGoal: "WEIGHT_LOSS",
      difficulty: "BEGINNER",
      duration: 45,
      calories: 400,
      equipmentRequired: false,
      sessionsPerWeek: 4,
      estimatedWeeks: 8,
    },
  });

  // Workout Plan 2
  await prisma.workoutPlan.create({
    data: {
      name: "Muscle Builder",
      description: "Build lean muscle.",
      category: "Strength",
      targetGoal: "MUSCLE_GAIN",
      difficulty: "INTERMEDIATE",
      duration: 60,
      calories: 500,
      equipmentRequired: true,
      sessionsPerWeek: 5,
      estimatedWeeks: 12,
    },
  });

  // Workout Plan 3
  await prisma.workoutPlan.create({
    data: {
      name: "Home Cardio",
      description: "Equipment-free cardio workout.",
      category: "Cardio",
      targetGoal: "GENERAL_FITNESS",
      difficulty: "BEGINNER",
      duration: 30,
      calories: 250,
      equipmentRequired: false,
      sessionsPerWeek: 3,
      estimatedWeeks: 6,
    },
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });