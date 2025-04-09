import express from "express";

import {
  newUserController,
  sendRecoverPassController,
  loginUserController,
} from "../controllers/users/index.js";

// Creamos un router
const router = express.Router();

// Creamos un usuario pendiente de activar
router.post("/users/register", newUserController);
//Creamos un endpoint para login de un usuario registrado
router.post("/users/login", loginUserController);

// Middleware que permite enviar un correo de recuperación de contraseña.
router.put("/users/password/recover", sendRecoverPassController);
export default router;
