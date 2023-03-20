/*
  Warnings:

  - Added the required column `estimatedTime` to the `Haircut` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Haircut" ADD COLUMN     "estimatedTime" INTEGER NOT NULL;
