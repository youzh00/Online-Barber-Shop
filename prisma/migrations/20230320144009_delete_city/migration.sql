/*
  Warnings:

  - You are about to drop the column `city` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "city",
DROP COLUMN "street";
