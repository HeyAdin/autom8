/*
  Warnings:

  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Autom" (
    "id" TEXT NOT NULL,
    "triggerId" TEXT NOT NULL,

    CONSTRAINT "Autom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trigger" (
    "id" TEXT NOT NULL,
    "automId" TEXT NOT NULL,
    "availableTriggerId" TEXT NOT NULL,

    CONSTRAINT "Trigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableTrigger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AvailableTrigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actions" (
    "id" TEXT NOT NULL,
    "actionId" TEXT NOT NULL,
    "automId" TEXT NOT NULL,

    CONSTRAINT "Actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableActions" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "AvailableActions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_automId_key" ON "Trigger"("automId");

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_automId_fkey" FOREIGN KEY ("automId") REFERENCES "Autom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_availableTriggerId_fkey" FOREIGN KEY ("availableTriggerId") REFERENCES "AvailableTrigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actions" ADD CONSTRAINT "Actions_automId_fkey" FOREIGN KEY ("automId") REFERENCES "Autom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actions" ADD CONSTRAINT "Actions_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "AvailableActions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
