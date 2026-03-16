-- CreateTable
CREATE TABLE "AutomRun" (
    "id" TEXT NOT NULL,
    "automId" TEXT NOT NULL,

    CONSTRAINT "AutomRun_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AutomRun" ADD CONSTRAINT "AutomRun_automId_fkey" FOREIGN KEY ("automId") REFERENCES "Autom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
