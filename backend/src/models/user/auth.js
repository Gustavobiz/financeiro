import { PrismaClient } from "@prisma/client";
import crypto from "crypto"
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export default async function execute(login, senha) {
  try {
    
    const senhaHash= crypto.createHash('sha256',senha).digest('hex');
    let user = await prisma.usuario.findUnique({
      where:{login:login, senha:senhaHash}
    });
    if(!user){
        throw new Error("Login inválido!");
    }
    let token = jwt.sign({ foo: 'bar' }, user.secretKey);
    return ({
        id:user.id,
        nome:user.nome,
        email:user.email,
        token
    });
  } catch (err) {
    throw err;
  } finally {
    prisma.$disconnect();
  }
}
