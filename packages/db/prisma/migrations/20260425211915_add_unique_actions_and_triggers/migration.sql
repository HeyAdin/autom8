/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `AvailableActions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `AvailableTrigger` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AvailableActions_type_key" ON "AvailableActions"("type");

-- CreateIndex
CREATE UNIQUE INDEX "AvailableTrigger_name_key" ON "AvailableTrigger"("name");
