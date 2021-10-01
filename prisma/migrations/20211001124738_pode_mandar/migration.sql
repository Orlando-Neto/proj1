/*
  Warnings:

  - You are about to alter the column `job` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "job" SET DATA TYPE VARCHAR(100);
