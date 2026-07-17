-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'LATE', 'ABSENT');

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_workoutPlanId_fkey";

-- DropForeignKey
ALTER TABLE "NutritionRecommendation" DROP CONSTRAINT "NutritionRecommendation_mealPlanId_fkey";

-- DropForeignKey
ALTER TABLE "NutritionRecommendation" DROP CONSTRAINT "NutritionRecommendation_memberId_fkey";

-- DropForeignKey
ALTER TABLE "ProgressLog" DROP CONSTRAINT "ProgressLog_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Recommendation" DROP CONSTRAINT "Recommendation_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Recommendation" DROP CONSTRAINT "Recommendation_workoutPlanId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutLog" DROP CONSTRAINT "WorkoutLog_memberId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutLog" DROP CONSTRAINT "WorkoutLog_workoutPlanId_fkey";

-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "status" "AttendanceStatus" NOT NULL DEFAULT 'PRESENT';

-- AlterTable
ALTER TABLE "ProgressLog" ADD COLUMN     "bodyFat" DOUBLE PRECISION,
ADD COLUMN     "muscleMass" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "WorkoutLog" ADD COLUMN     "completionPercentage" INTEGER;

-- CreateIndex
CREATE INDEX "Attendance_memberId_idx" ON "Attendance"("memberId");

-- CreateIndex
CREATE INDEX "Exercise_workoutPlanId_idx" ON "Exercise"("workoutPlanId");

-- CreateIndex
CREATE INDEX "MemberProfile_trainerId_idx" ON "MemberProfile"("trainerId");

-- CreateIndex
CREATE INDEX "MemberProfile_workoutPlanId_idx" ON "MemberProfile"("workoutPlanId");

-- CreateIndex
CREATE INDEX "MemberProfile_fitnessGoal_idx" ON "MemberProfile"("fitnessGoal");

-- CreateIndex
CREATE INDEX "MemberProfile_fitnessLevel_idx" ON "MemberProfile"("fitnessLevel");

-- CreateIndex
CREATE INDEX "NutritionRecommendation_memberId_idx" ON "NutritionRecommendation"("memberId");

-- CreateIndex
CREATE INDEX "ProgressLog_memberId_idx" ON "ProgressLog"("memberId");

-- CreateIndex
CREATE INDEX "Recommendation_memberId_idx" ON "Recommendation"("memberId");

-- CreateIndex
CREATE INDEX "TrainerProfile_specialization_idx" ON "TrainerProfile"("specialization");

-- CreateIndex
CREATE INDEX "WorkoutLog_memberId_idx" ON "WorkoutLog"("memberId");

-- CreateIndex
CREATE INDEX "WorkoutLog_workoutPlanId_idx" ON "WorkoutLog"("workoutPlanId");

-- CreateIndex
CREATE INDEX "WorkoutPlan_difficulty_idx" ON "WorkoutPlan"("difficulty");

-- CreateIndex
CREATE INDEX "WorkoutPlan_targetGoal_idx" ON "WorkoutPlan"("targetGoal");

-- CreateIndex
CREATE INDEX "WorkoutPlan_isActive_idx" ON "WorkoutPlan"("isActive");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "MemberProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionRecommendation" ADD CONSTRAINT "NutritionRecommendation_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "MemberProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionRecommendation" ADD CONSTRAINT "NutritionRecommendation_mealPlanId_fkey" FOREIGN KEY ("mealPlanId") REFERENCES "MealPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressLog" ADD CONSTRAINT "ProgressLog_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "MemberProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutLog" ADD CONSTRAINT "WorkoutLog_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "MemberProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutLog" ADD CONSTRAINT "WorkoutLog_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "MemberProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
