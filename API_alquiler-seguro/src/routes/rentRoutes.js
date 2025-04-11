import express from "express";

import { listRentController } from "../controllers/rents/listRentController.js";

// Creamos un router
const router = express.Router();

// Obtener el listado de alquileres.
router.get("/rents", listRentController);

export default router;
