/*
  Warnings:

  - You are about to alter the column `amount` on the `Entrie` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Entrie" ALTER COLUMN "amount" SET DATA TYPE INTEGER;
