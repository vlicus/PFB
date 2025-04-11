// Importamos las dependencias.
import express from "express";
import { getRentController } from "../controllers/rents/index.js";
import { rentExistsController } from "../middlewares/index.js";
import { listRentController } from "../controllers/rents/listRentController.js";
// Creamos un router.
const router = express.Router();

// Obtener info de un alquiler concreto

router.get("/rent/:rentId", rentExistsController, getRentController);

// Obtener el listado de alquileres.
router.get("/rents", listRentController);


export default router;
