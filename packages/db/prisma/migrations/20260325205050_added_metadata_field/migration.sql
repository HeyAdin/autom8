-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Autom" (
    "id" TEXT NOT NULL,
    "triggerId" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,

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

-- CreateTable
CREATE TABLE "AutomRun" (
    "id" TEXT NOT NULL,
    "automId" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "AutomRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutomRunOutbox" (
    "id" TEXT NOT NULL,
    "automRunId" TEXT NOT NULL,

    CONSTRAINT "AutomRunOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_automId_key" ON "Trigger"("automId");

-- CreateIndex
CREATE UNIQUE INDEX "AutomRunOutbox_automRunId_key" ON "AutomRunOutbox"("automRunId");

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_automId_fkey" FOREIGN KEY ("automId") REFERENCES "Autom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_availableTriggerId_fkey" FOREIGN KEY ("availableTriggerId") REFERENCES "AvailableTrigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actions" ADD CONSTRAINT "Actions_automId_fkey" FOREIGN KEY ("automId") REFERENCES "Autom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actions" ADD CONSTRAINT "Actions_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "AvailableActions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutomRun" ADD CONSTRAINT "AutomRun_automId_fkey" FOREIGN KEY ("automId") REFERENCES "Autom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutomRunOutbox" ADD CONSTRAINT "AutomRunOutbox_automRunId_fkey" FOREIGN KEY ("automRunId") REFERENCES "AutomRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
