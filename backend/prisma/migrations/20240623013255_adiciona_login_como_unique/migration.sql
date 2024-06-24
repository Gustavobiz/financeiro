/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Made the column `nome` on table `Usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cpf` on table `Usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `secretKey` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "nome" SET NOT NULL,
ALTER COLUMN "cpf" SET NOT NULL,
ALTER COLUMN "secretKey" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_login_key" ON "Usuario"("login");
