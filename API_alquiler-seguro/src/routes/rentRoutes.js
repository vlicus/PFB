// Importamos las dependencias.
import express from "express";
import { listRentController } from "../controllers/rents/listRentController.js";
import { getRentController } from "../controllers/rents/index.js";

import {
  rentExistsController,
  authUserController,
  userExistsController,
  rentExistsController,
  canEditController,
  authUserOptionalController,
} from "../middlewares/index.js";

// Creamos un router.
const router = express.Router();

router.post(
  "/rent/:rentId/photos",
  authUserController,
  userExistsController,
  rentExistsController,
  canEditController,
  addEntryPhotoController
);

// Eliminar una foto de una entrada.
router.delete(
  "/rent/:rentId/photos/:photoId",
  authUserController,
  authUserOptionalController,
  userExistsController,
  rentExistsController,
  canEditController,
  deleteEntryPhotoController
);

// Creamos un router.
const router = express.Router();

// Obtener info de un alquiler concreto
router.get("/rent/:rentId", rentExistsController, getRentController);

// Obtener el listado de alquileres.
router.get("/rents", listRentController);

export default router;
