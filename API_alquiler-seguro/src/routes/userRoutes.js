import express from "express";

import newUserController from "../controllers/users/newUserController.js";

// Creamos un router
const router = express.Router();

// Creamos un usuario pendiente de activar
router.post("/users/register", newUserController);

export default router;
