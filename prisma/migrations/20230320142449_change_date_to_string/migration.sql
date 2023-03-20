/*
  Warnings:

  - You are about to drop the column `address` on the `Shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "address",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "street" TEXT,
ALTER COLUMN "opening" SET DATA TYPE TEXT,
ALTER COLUMN "closing" SET DATA TYPE TEXT;
