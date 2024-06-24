import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function execute(usuarioId, valor) {
  try {
    
    let create = await prisma.carteira.update({
      where:{usuarioId},
        data: {
        valor
      },
    });
    return create;
  } catch (err) {
    return  err;
  } finally {
    prisma.$disconnect();
  }
}
