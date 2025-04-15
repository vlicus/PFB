// Importamos las dependencias.
import express from "express";
import {
  getRentController,
  listRentController,
  addRentPhotoController,
  deleteRentPhotoController,
  voteRentController,
  newRentController,
  approveRentController,
  requestRentController,
  listRentRequestController,
  editStatusRentController,
  approveVisitController,
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
  addRentPhotoController,
  approveRentController
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

// Eliminar una foto de un alquiler.
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

//aprobar un alquiler
router.post(
  "/rent/:rentId/approve",
  authUserController,
  userExistsController,
  rentExistsController,
  approveRentController
);

//Cambiar el estado de un alquiler
router.put(
  "/rent/:rentId",
  authUserController,
  rentExistsController,
  editStatusRentController
);

// aprobar/rechazar visita/alquiler
router.put(
  "/rent/:rentId/response/:requestId",
  authUserController,
  rentExistsController,
  approveVisitController
);

export default router;
