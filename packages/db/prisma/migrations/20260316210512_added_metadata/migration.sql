/*
  Warnings:

  - Added the required column `metadata` to the `Autom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Autom" ADD COLUMN     "metadata" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "AutomRunOutbox" (
    "id" TEXT NOT NULL,
    "automRunId" TEXT NOT NULL,

    CONSTRAINT "AutomRunOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AutomRunOutbox_automRunId_key" ON "AutomRunOutbox"("automRunId");

-- AddForeignKey
ALTER TABLE "AutomRunOutbox" ADD CONSTRAINT "AutomRunOutbox_automRunId_fkey" FOREIGN KEY ("automRunId") REFERENCES "AutomRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
