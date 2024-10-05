/*
  Warnings:

  - You are about to drop the column `currentValue` on the `PerformanceMetrics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PerformanceMetrics" DROP COLUMN "currentValue",
ADD COLUMN     "CurrentValue" INTEGER DEFAULT 0;
