/*
  Warnings:

  - Added the required column `availableDaysPerWeek` to the `MemberProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedWeeks` to the `WorkoutPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionsPerWeek` to the `WorkoutPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MemberProfile" ADD COLUMN     "availableDaysPerWeek" INTEGER NOT NULL,
ADD COLUMN     "preferredWorkoutTime" TEXT;

-- AlterTable
ALTER TABLE "WorkoutPlan" ADD COLUMN     "equipmentRequired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "estimatedWeeks" INTEGER NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sessionsPerWeek" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" SERIAL NOT NULL,
    "memberId" INTEGER NOT NULL,
    "workoutPlanId" INTEGER NOT NULL,
    "recommendationScore" DOUBLE PRECISION NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "MemberProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
