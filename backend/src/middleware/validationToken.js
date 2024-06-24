import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export default async function handle(req, res, next) {
  const token = req.headers?.authorization?.split(' ')[1]
  const usuarioId = req.body.usuarioId;
 
  try {
    if (!token || token == "" || !usuarioId || usuarioId == "") {
        return res.status(401).json({erro:"Acesso negado!"});
    }
    let user = await prisma.usuario.findUnique({
      where: { id:usuarioId },
    });
    if (!user?.secretKey) {
        return res.status(401).json({erro:"Asuario não encontrado"});
    }
    jwt.verify(token, user.secretKey, (err, decoded)=>{
        if (err) {
            return res.status(401).json({erro:"Acesso negado"});
        }
        next();
    });
   
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}