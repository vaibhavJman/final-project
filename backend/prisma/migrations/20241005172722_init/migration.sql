/*
  Warnings:

  - You are about to drop the column `CurrentValue` on the `PerformanceMetrics` table. All the data in the column will be lost.
  - Added the required column `increment` to the `PerformanceMetrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `threshold` to the `PerformanceMetrics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PerformanceMetrics" DROP COLUMN "CurrentValue",
ADD COLUMN     "currentValue" INTEGER DEFAULT 0,
ADD COLUMN     "increment" INTEGER NOT NULL,
ADD COLUMN     "threshold" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "EmployeePerformanceMetric" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "metricId" INTEGER NOT NULL,
    "currentValue" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeePerformanceMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetricThreshold" (
    "id" SERIAL NOT NULL,
    "threshold1" INTEGER NOT NULL,
    "threshold2" INTEGER NOT NULL,
    "performanceInc1" INTEGER NOT NULL,
    "performanceInc2" INTEGER NOT NULL,
    "performanceMetricId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MetricThreshold_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmployeePerformanceMetric" ADD CONSTRAINT "EmployeePerformanceMetric_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeePerformanceMetric" ADD CONSTRAINT "EmployeePerformanceMetric_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "PerformanceMetrics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricThreshold" ADD CONSTRAINT "MetricThreshold_performanceMetricId_fkey" FOREIGN KEY ("performanceMetricId") REFERENCES "PerformanceMetrics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
