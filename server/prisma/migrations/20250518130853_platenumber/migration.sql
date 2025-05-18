/*
  Warnings:

  - You are about to drop the column `license` on the `vehicles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[platenumber]` on the table `vehicles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `platenumber` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "vehicles_license_key";

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "license",
ADD COLUMN     "platenumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_platenumber_key" ON "vehicles"("platenumber");
