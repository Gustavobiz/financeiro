import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function execute(id) {
  try {
    const deleteP = await prisma.usuario.delete({where:id });
    return deleteP;
  } catch (err) {
    throw err
  } finally {
    prisma.$disconnect();
  }
}
