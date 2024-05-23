/*
  Warnings:

  - You are about to drop the `transportist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "transportist" DROP CONSTRAINT "transportist_dni_fkey";

-- DropTable
DROP TABLE "transportist";

-- CreateTable
CREATE TABLE "Transportist" (
    "id" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "license" TEXT NOT NULL,

    CONSTRAINT "Transportist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transportist_dni_key" ON "Transportist"("dni");

-- AddForeignKey
ALTER TABLE "Transportist" ADD CONSTRAINT "Transportist_dni_fkey" FOREIGN KEY ("dni") REFERENCES "Person"("dni") ON DELETE RESTRICT ON UPDATE CASCADE;
