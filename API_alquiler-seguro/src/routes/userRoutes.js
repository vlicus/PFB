import express from "express";

import {
  newUserController,
  sendRecoverPassController,
  loginUserController,
  userHistoryAndDetailsController,
  userPasswordChangeController,
} from "../controllers/users/index.js";

// Importamos las funciones controladoras intermedias.
import {
  authUserController,
  userExistsController,
} from "../middlewares/index.js";
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
router.get("/user/history/:id", userHistoryAndDetailsController);

// Middleware que permite enviar un correo de recuperación de contraseña.
router.put("/users/password/recover", sendRecoverPassController);

// Creamos un endpoint que permite cambiar la contraseña al usuario
router.post(
  "/users/password/change",
  authUserController,
  userPasswordChangeController
);

export default router;
