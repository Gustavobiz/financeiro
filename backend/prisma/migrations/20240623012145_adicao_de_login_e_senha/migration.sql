/*
  Warnings:

  - Added the required column `login` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Carteira" DROP CONSTRAINT "Carteira_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "CriptoComprada" DROP CONSTRAINT "CriptoComprada_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "login" TEXT NOT NULL,
ADD COLUMN     "senha" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Carteira" ADD CONSTRAINT "Carteira_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CriptoComprada" ADD CONSTRAINT "CriptoComprada_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
