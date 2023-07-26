/*
  Warnings:

  - Made the column `description` on table `EntryDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `locale` on table `EntryDetails` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EntryDetails" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "locale" SET NOT NULL;
