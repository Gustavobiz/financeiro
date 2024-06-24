import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function execute(usuarioId, criptoId) {
  let valueCoin = 100;
  try {
    
    let remove = await prisma.criptoComprada.delete({
        where:{id:criptoId}
    });
    if(!remove){
      throw new Error("Liquidez não realizada!");
    }
    const carteiraAtual = await prisma.carteira.findUnique({
        where: { usuarioId },
      });
    if(!remove){
        throw new Error("Impossivel a atualizar a carteira");
        //Aqui é um erro crítico, comprou e não pagou 
    }
    await prisma.carteira.update({
        where:{usuarioId},
        data:{
            valor:carteiraAtual.valor+(valueCoin*remove.quantidade)
        }
    });

    return remove;
  } catch (err) {
    throw err;
  } finally {
    prisma.$disconnect();
  }
}
