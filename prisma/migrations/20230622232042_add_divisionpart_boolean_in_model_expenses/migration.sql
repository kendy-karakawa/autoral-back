/*
  Warnings:

  - Added the required column `divisionPart` to the `Expenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expenses" ADD COLUMN     "divisionPart" BOOLEAN NOT NULL;
