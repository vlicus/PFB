// Importamos las dependencias.
import express from "express";
import {
  getRentController,
  listRentController,
  addRentPhotoController,
  deleteRentPhotoController,
  voteRentController,
} from "../controllers/rents/index.js";

import {
  rentExistsController,
  authUserController,
  userExistsController,
  canEditController,
  authUserControllerOptional,
} from "../middlewares/index.js";

// Creamos un router.
const router = express.Router();

router.post(
  "/rent/:rentId/photos",
  authUserController,
  userExistsController,
  rentExistsController,
  canEditController,
  addRentPhotoController
);

// Votar un alquiler
router.post(
  "/rent/:rentId/votes",
  authUserController,
  userExistsController,
  rentExistsController,
  voteRentController
);

// Eliminar una foto de una entrada.
router.delete(
  "/rent/:rentId/photos/:photoId",
  authUserController,
  authUserControllerOptional,
  userExistsController,
  rentExistsController,
  canEditController,
  deleteRentPhotoController
);

// Obtener info de un alquiler concreto
router.get("/rent/:rentId", rentExistsController, getRentController);

// Obtener el listado de alquileres.
router.get("/rents", listRentController);

export default router;
