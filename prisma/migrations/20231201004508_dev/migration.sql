/*
  Warnings:

  - You are about to drop the `Geocalizacao` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `latitude` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Empresa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Geocalizacao" DROP CONSTRAINT "Geocalizacao_empresaId_fkey";

-- AlterTable
ALTER TABLE "Empresa" ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Geocalizacao";
