/*
  Warnings:

  - The primary key for the `parking_requests` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "parking_requests" DROP CONSTRAINT "parking_requests_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "parking_requests_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "parking_requests_id_seq";
