-- DropForeignKey
ALTER TABLE "Training" DROP CONSTRAINT "Training_trainerId_fkey";

-- AlterTable
ALTER TABLE "PerformanceMetrics" ADD COLUMN     "CurrentValue" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "Training" ALTER COLUMN "trainerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TrainingAssignment" ADD COLUMN     "isAssigned" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isTrainerAssigned" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
