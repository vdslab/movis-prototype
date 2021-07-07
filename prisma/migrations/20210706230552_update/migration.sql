/*
  Warnings:

  - A unique constraint covering the columns `[jfdbId]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Staff" ADD COLUMN "jfdbId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Staff.jfdbId_unique" ON "Staff"("jfdbId");
