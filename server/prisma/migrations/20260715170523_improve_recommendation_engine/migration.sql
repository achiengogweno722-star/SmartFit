/*
  Warnings:

  - Added the required column `targetGoal` to the `WorkoutPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutPlan" ADD COLUMN     "targetGoal" "FitnessGoal" NOT NULL;
