-- DropForeignKey
ALTER TABLE "Vaga" DROP CONSTRAINT "Vaga_empresaId_fkey";

-- AddForeignKey
ALTER TABLE "Vaga" ADD CONSTRAINT "Vaga_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
