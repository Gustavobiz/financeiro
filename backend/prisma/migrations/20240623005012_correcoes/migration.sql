/*
  Warnings:

  - You are about to drop the column `nome_cripto` on the `CriptoComprada` table. All the data in the column will be lost.
  - You are about to drop the column `preco_compra` on the `CriptoComprada` table. All the data in the column will be lost.
  - Added the required column `nomeCripto` to the `CriptoComprada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precoCompra` to the `CriptoComprada` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CriptoComprada" DROP COLUMN "nome_cripto",
DROP COLUMN "preco_compra",
ADD COLUMN     "nomeCripto" TEXT NOT NULL,
ADD COLUMN     "precoCompra" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "secretKey" TEXT;
