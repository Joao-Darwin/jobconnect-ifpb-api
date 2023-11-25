/*
  Warnings:

  - Added the required column `avatar` to the `Discente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discente" ADD COLUMN     "avatar" TEXT NOT NULL;
