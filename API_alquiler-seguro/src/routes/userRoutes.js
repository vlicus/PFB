import express from "express";

import newUserController from "../controllers/users/newUserController.js";
import loginUserController from "../controllers/users/loginUserController.js";
// Creamos un router
const router = express.Router();

// Creamos un usuario pendiente de activar
router.post("/users/register", newUserController);

//Creamos un endpoint para login de un usuario registrado
router.post("/users/login", loginUserController);


export default router;
