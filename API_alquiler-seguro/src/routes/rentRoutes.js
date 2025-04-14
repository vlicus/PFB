// Importamos las dependencias.
import express from "express";
import {
  getRentController,
  listRentController,
  addRentPhotoController,
  deleteRentPhotoController,
  voteRentController,
  editStatusRentController,
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

// Obtener el listado de alquileres.
router.get("/rents", listRentController);

//Cambiar el estado de un alquiler
router.put(
  "/rent/:rentId",
  authUserController,
  authUserControllerOptional,
  userExistsController,
  rentExistsController,
  canEditController,
  editStatusRentController
);

export default router;
