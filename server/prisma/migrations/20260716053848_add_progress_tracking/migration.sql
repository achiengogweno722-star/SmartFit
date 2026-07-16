-- CreateTable
CREATE TABLE "ProgressLog" (
    "id" SERIAL NOT NULL,
    "memberId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "bmi" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProgressLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProgressLog" ADD CONSTRAINT "ProgressLog_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "MemberProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
