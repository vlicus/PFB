// Importamos las dependencias.
import express from "express";
import {
  getRentController,
  listRentController,
  addRentPhotoController,
  deleteRentPhotoController,
  newRentController,
  approveRentController,
  requestRentController,
  listRentRequestController,
  editStatusRentController,
  approveVisitController,
  listFilteredRentsController,
  updateRentController,
  listApprovedRentController,
  notApprovedRentController,
  getRentRequestController,
  listMyRentRequestController,
  listCitiesController,
  listOwnRentsController,
} from "../controllers/rents/index.js";

import {
  rentExistsController,
  authUserController,
  userExistsController,
  canEditController,
  authUserControllerOptional,
  rentRequestExistsController,
} from "../middlewares/index.js";

// Creamos un router.
const router = express.Router();

// Añadir fotos a un alquiler
router.post(
  "/rent/:rentId/photos",
  authUserController,
  rentExistsController,
  canEditController,
  addRentPhotoController
);

// Insertar un nuevo alquiler.
router.post("/rent/register", authUserController, newRentController);

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

// Obtener info de una solicitud de alquiler concreta
router.get(
  "/rent/request/:requestId",
  authUserController,
  rentRequestExistsController,
  getRentRequestController
);

// Solicitar visita/alquiler
router.post(
  "/rent/:rentId/request",
  authUserController,
  rentExistsController,
  requestRentController
);

// Obtener el listado de las solicitudes de visita/alquiler.(como casero)
router.get("/rents/requests", authUserController, listRentRequestController);
// Obtener el listado de las solicitudes de visita/alquiler.(como inquilino)
router.get(
  "/rents/renter/requests",
  authUserController,
  listMyRentRequestController
);

// Obtener el listado de alquileres.
router.get("/rents", listRentController);

//Obtener listado de rentas aprobadas
router.get("/rents/approved", listApprovedRentController);

//Obtener el listado de alquileres filtrados
router.get("/rents/filter", listFilteredRentsController);

//aprobar un alquiler
router.put(
  "/rent/:rentId/approve",
  authUserController,
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

//Actualizar info  de un alquiler
router.put(
  "/rent/:rentId/update",
  authUserController,
  rentExistsController,
  canEditController,
  updateRentController
);
//Obtener lista de los alquileres no aprobados aun por el admin.
router.get("/rents/notapproved", notApprovedRentController);

//Lista de ciudades donde hay alquileres
router.get("/cities", listCitiesController);

//Obtener un listado de alquileres por usuario como casero
router.get("/rents/own", authUserController, listOwnRentsController);
export default router;
