/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hashedPassword" TEXT,
ADD COLUMN     "img" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user',
ALTER COLUMN "name" SET NOT NULL;
