import express from "express";

import {
  newUserController,
  sendRecoverPassController,
  loginUserController,
  userHistoryAndDetailsController,
} from "../controllers/users/index.js";
import userDetailsController from "../controllers/users/userDetailsController.js";

// Creamos un router
const router = express.Router();

// Creamos un usuario pendiente de activar
router.post("/users/register", newUserController);
//Creamos un endpoint para login de un usuario registrado
router.post("/users/login", loginUserController);

//Creamos un endpoint para los detalles de un usuario
router.get("/user/:id", userDetailsController);

//Creamos un endpoint para detalles de usuario  con el histórico de alquileres hechos
router.get("/user/:id", userHistoryAndDetailsController);

// Middleware que permite enviar un correo de recuperación de contraseña.
router.put("/users/password/recover", sendRecoverPassController);
export default router;
