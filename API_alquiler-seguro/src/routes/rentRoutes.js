import express from "express";

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

// Obtener info de un alquiler concreto

router.get("/rent/:rentId", rentExistsController, getRentController);

export default router;
