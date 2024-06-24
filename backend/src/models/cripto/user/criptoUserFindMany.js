import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function execute(usuarioId) {
  try {
    
    let findmany = await prisma.criptoComprada.findMany({
        where:{usuarioId}
    });
   
    return findmany;
  } catch (err) {
    throw err;
  } finally {
    prisma.$disconnect();
  }
}
