-- CreateTable
CREATE TABLE "Instituicao" (
    "id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Instituicao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discente" (
    "id" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "instituicaoId" TEXT NOT NULL,

    CONSTRAINT "Discente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vaga" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "perfilProfissional" TEXT NOT NULL,
    "procedimento" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "Vaga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Geocalizacao" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Point',
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "Geocalizacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DiscenteToVaga" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Instituicao_cnpj_key" ON "Instituicao"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Discente_matricula_key" ON "Discente"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Discente_telefone_key" ON "Discente"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Discente_email_key" ON "Discente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Discente_instituicaoId_key" ON "Discente"("instituicaoId");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cnpj_key" ON "Empresa"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_email_key" ON "Empresa"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_DiscenteToVaga_AB_unique" ON "_DiscenteToVaga"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscenteToVaga_B_index" ON "_DiscenteToVaga"("B");

-- AddForeignKey
ALTER TABLE "Discente" ADD CONSTRAINT "Discente_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vaga" ADD CONSTRAINT "Vaga_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Geocalizacao" ADD CONSTRAINT "Geocalizacao_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscenteToVaga" ADD CONSTRAINT "_DiscenteToVaga_A_fkey" FOREIGN KEY ("A") REFERENCES "Discente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscenteToVaga" ADD CONSTRAINT "_DiscenteToVaga_B_fkey" FOREIGN KEY ("B") REFERENCES "Vaga"("id") ON DELETE CASCADE ON UPDATE CASCADE;
