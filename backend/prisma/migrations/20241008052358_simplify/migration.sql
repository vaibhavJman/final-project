/*
  Warnings:

  - The values [LEADERSHIP,OTHER] on the enum `Domain` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Domain_new" AS ENUM ('FULL_STACK', 'DATA_ENGINEERING', 'MACHINE_LEARNING', 'DEVOPS', 'PROBLEM_SOLVING');
ALTER TABLE "Training" ALTER COLUMN "domain" TYPE "Domain_new" USING ("domain"::text::"Domain_new");
ALTER TYPE "Domain" RENAME TO "Domain_old";
ALTER TYPE "Domain_new" RENAME TO "Domain";
DROP TYPE "Domain_old";
COMMIT;
