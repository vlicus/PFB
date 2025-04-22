import express from "express";

import {
  newUserController,
  sendRecoverPassController,
  loginUserController,
  userHistoryAndDetailsController,
  validationController,
  userPasswordChangeController,
  userDetailsController,
  updateUserController,
  voteUserController,
  editUserPassWithRecoverController,
  getOwnUserController,
} from "../controllers/users/index.js";

// Importamos las funciones controladoras intermedias.
import {
  authUserController,
  userExistsController,
} from "../middlewares/index.js";

import listUsersController from "../controllers/users/listUsersController.js";

// Creamos un router
const router = express.Router();

// Creamos un usuario pendiente de activar
router.post("/users/register", newUserController);

// Endpoint validacion usuario
router.post("/users/validation", validationController);

//Creamos un endpoint para login de un usuario registrado
router.post("/users/login", userExistsController, loginUserController);

// Obtener el listado de usuarios.
router.get("/users/list", authUserController, listUsersController);

//Creamos un endpoint para los detalles de un usuario
router.get("/users/:userId", userExistsController, userDetailsController);

// Obtener perfil privado de un usuario.
router.get(
  "/users",
  authUserController,
  userExistsController,
  getOwnUserController
);
router.get("/users/:userId", userDetailsController);

//Creamos un endpoint para detalles de usuario  con el histórico de alquileres hechos
router.get(
  "/users/:userId/history",
  authUserController,
  userHistoryAndDetailsController
);

// Middleware que permite enviar un correo de recuperación de contraseña.
router.put("/users/password/recover", sendRecoverPassController);

// Editar la contraseña de un usuario con un código de recuperación.
router.put("/users/password", editUserPassWithRecoverController);

// Creamos un endpoint que permite cambiar la contraseña al usuario
router.post(
  "/users/password/change",
  authUserController,
  userPasswordChangeController
);

// Votar a un usuario.
router.post(
  "/user/:userId/:rentHistoryId/votes",
  authUserController,
  userExistsController,
  voteUserController
);

// Creamos un endpoint para editar los datos de usuario
router.put(
  "/users/update",
  authUserController,
  userExistsController,
  updateUserController
);

export default router;
