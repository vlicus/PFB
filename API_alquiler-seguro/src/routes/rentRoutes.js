// Importamos las dependencias.
import express from "express";
import {
  getRentController,
  listRentController,
  addRentPhotoController,
  deleteRentPhotoController,
  voteRentController,
  newRentController,
  requestRentController,
  listRentRequestController,
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
// Insertar un nuevo alquiler.
router.post("/rent/register", authUserController, newRentController);

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

// Solicitar visita/alquiler
router.post(
  "/rent/:rentId/request",
  authUserController,
  rentExistsController,
  requestRentController
);

// Obtener el listado de las solicitudes de visita/alquiler.
router.get("/rents/requests", listRentRequestController);

// Obtener el listado de alquileres.
router.get("/rents", listRentController);

export default router;
