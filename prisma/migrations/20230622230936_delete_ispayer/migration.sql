/*
  Warnings:

  - Added the required column `isPayer` to the `Divisions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Divisions" ADD COLUMN     "isPayer" BOOLEAN NOT NULL;
