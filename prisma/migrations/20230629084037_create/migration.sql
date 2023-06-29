/*
  Warnings:

  - You are about to drop the `Entrie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Entrie";

-- CreateTable
CREATE TABLE "Entry" (
    "id" TEXT NOT NULL,
    "type" "TYPE" NOT NULL DEFAULT 'EXPENSE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntryDetails" (
    "id" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "description" TEXT,
    "locale" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EntryDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EntryDetails" ADD CONSTRAINT "EntryDetails_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
