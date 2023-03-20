/*
  Warnings:

  - Made the column `city` on table `Shop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `street` on table `Shop` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Shop" ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "street" SET NOT NULL;
