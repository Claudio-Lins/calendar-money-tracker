-- CreateEnum
CREATE TYPE "TYPE" AS ENUM ('INCOME', 'EXPENSE');

-- CreateTable
CREATE TABLE "Entrie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "TYPE" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entrie_pkey" PRIMARY KEY ("id")
);
