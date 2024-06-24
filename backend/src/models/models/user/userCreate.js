import { PrismaClient } from "@prisma/client";
import crypto from "crypto"
const prisma = new PrismaClient();

export default async function execute(nome, cpf, email,senha, login ) {
  try {
    const hashHex = crypto.createHash('md5',"UrubuPaoMago").digest('hex');
    const senhaHash = crypto.createHash('sha256',senha).digest('hex');
    let create = await prisma.usuario.create({
      data: {
        nome,
        cpf,
        email,
        login,
        senha:senhaHash,
        secretKey:hashHex,
        Carteira:{
          create: {
            valor: 0
          }
        }
      },
    });
    return create;
  } catch (err) {
    throw err;
  } finally {
    prisma.$disconnect();
  }
}
