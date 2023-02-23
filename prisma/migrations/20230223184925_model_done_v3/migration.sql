/*
  Warnings:

  - You are about to drop the column `ending` on the `Shop` table. All the data in the column will be lost.
  - Added the required column `closing` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "GENDER" ADD VALUE 'BOTH';

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "ending",
ADD COLUMN     "closing" TIMESTAMP(3) NOT NULL;
