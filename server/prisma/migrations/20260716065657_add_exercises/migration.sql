-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "workoutPlanId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER,
    "durationSeconds" INTEGER,
    "restSeconds" INTEGER NOT NULL,
    "difficulty" "FitnessLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
