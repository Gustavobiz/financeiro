import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function execute(nomeCripto, quantidade, usuarioId) {
  try {
    // Verificar a carteira
    let carteira = await prisma.carteira.findUnique({
      where: { usuarioId }
    });
    if (!carteira) {
      throw new Error("Carteira não encontrada");
    }
    let money = carteira.valor;

    // Obter o valor de compra da moeda escolhida (aqui você deve implementar a lógica real para obter o valor da moeda)
    let valueCoin = 40; // Substituir pelo valor real da moeda

    if (valueCoin * quantidade <= money) {
      let criptoExistente = await prisma.criptoComprada.findFirst({
        where: {
          nomeCripto: nomeCripto,
          usuarioId: usuarioId
        }
      });

      let response;
      if (criptoExistente) {
        const novaQuantidade = criptoExistente.quantidade + quantidade;
        const novoValorCompra = criptoExistente.precoCompra + (valueCoin * quantidade);

        response = await prisma.criptoComprada.update({
          where: { id: criptoExistente.id },
          data: {
            quantidade: novaQuantidade,
            precoCompra: novoValorCompra
          }
        });
      } else {
        response = await prisma.criptoComprada.create({
          data: {
            nomeCripto,
            quantidade,
            precoCompra: valueCoin * quantidade,
            usuarioId
          }
        });
      }

      // Atualizar o saldo na carteira
      let carteira =await prisma.carteira.update({
        where: { usuarioId },
        data: {
          valor: money - (valueCoin * quantidade)
        }
      });

      return response;
    } else {
      throw new Error("Saldo da carteira insuficiente!");
    }
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
