/*
  Warnings:

  - Added the required column `password` to the `Discente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Instituicao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Instituicao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discente" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Empresa" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Instituicao" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;
