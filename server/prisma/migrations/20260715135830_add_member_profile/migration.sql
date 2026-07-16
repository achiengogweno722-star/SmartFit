-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "FitnessLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "FitnessGoal" AS ENUM ('WEIGHT_LOSS', 'MUSCLE_GAIN', 'STRENGTH', 'ENDURANCE', 'GENERAL_FITNESS');

-- CreateTable
CREATE TABLE "MemberProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "fitnessLevel" "FitnessLevel" NOT NULL,
    "fitnessGoal" "FitnessGoal" NOT NULL,
    "medicalConditions" TEXT,
    "phoneNumber" TEXT,
    "address" TEXT,
    "emergencyContact" TEXT,
    "bmi" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MemberProfile_userId_key" ON "MemberProfile"("userId");

-- AddForeignKey
ALTER TABLE "MemberProfile" ADD CONSTRAINT "MemberProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
