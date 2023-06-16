/*
  Warnings:

  - You are about to drop the column `participantId` on the `Expenses` table. All the data in the column will be lost.
  - Added the required column `paidBy` to the `Expenses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_participantId_fkey";

-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "participantId",
ADD COLUMN     "paidBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_paidBy_fkey" FOREIGN KEY ("paidBy") REFERENCES "Participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
