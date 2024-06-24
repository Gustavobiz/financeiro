// src/router.js
import express from 'express';
const router = express.Router();

import userCreateController from "./controllers/user/userCreateController.js";
import userDeleteController from "./controllers/user/userCreateController.js";
import carteiraUpdateController from "./controllers/carteira/carteiraUpdateController.js";
import criptoUserCreate from "./controllers/cripto/user/criptoUserCreateController.js"
import criptoUserDelete from "./controllers/cripto/user/criptoUserDeleteController.js"
import criptoUserFindMany from "./controllers/cripto/user/criptoUserFindManyController.js"
import criptoFindMany from "./controllers/cripto/getAllCriptosController.js"
import criptoFind from "./controllers/cripto/getCriptoApiController.js"
import login from "./controllers/user/authController.js"
import verificationToken from "./middleware/validationToken.js"
//rotas de usuario
router.post('/user/create', userCreateController);
router.put('/user/delete',userDeleteController);
//rotas de Carteira
router.put('/carteira/update', carteiraUpdateController);
//rotas de cripto compradas
router.post('/cripto/user/create', criptoUserCreate);
router.delete('/cripto/user/delete', criptoUserDelete);
router.get('/cripto/user/findMany', criptoUserFindMany);
// bain
router.get('/cripto/findMany', criptoFindMany);
router.post('/cripto/find', verificationToken, criptoFind);
//login
router.post("/login", login)

export default router;
