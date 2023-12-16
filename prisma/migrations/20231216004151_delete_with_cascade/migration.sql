-- DropForeignKey
ALTER TABLE "Discente" DROP CONSTRAINT "Discente_instituicaoId_fkey";

-- DropForeignKey
ALTER TABLE "Vaga" DROP CONSTRAINT "Vaga_empresaId_fkey";

-- AddForeignKey
ALTER TABLE "Discente" ADD CONSTRAINT "Discente_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vaga" ADD CONSTRAINT "Vaga_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
