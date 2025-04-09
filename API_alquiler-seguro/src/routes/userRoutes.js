import express from "express";

import {
  newUserController,
  sendRecoverPassController,
} from "../controllers/users/index.js";

// Creamos un router
const router = express.Router();

// Creamos un usuario pendiente de activar
router.post("/users/register", newUserController);

// Middleware que permite enviar un correo de recuperación de contraseña.
router.put("/users/password/recover", sendRecoverPassController);

export default router;
