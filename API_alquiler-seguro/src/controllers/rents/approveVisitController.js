import checkRentalHistoryModel from "../../middlewares/checkRentalHistoryModel.js";
import approveVisitModel from "../../models/rents/approveVisitModel.js";
import selectRentByIdModel from "../../models/rents/selectRentByIdModel.js";
import { cannotAcceptRequestRentError } from "../../services/errorService.js";

const approveVisitController = async (req, res, next) => {
  try {
    const { rentId, requestId } = req.params; // rentId y requestId desde los parámetros
    const { status } = req.body; // "APPROVED" o "REJECTED" desde el cuerpo de la solicitud

    if (!["APPROVED", "REJECTED", "ACTIVE", "CANCELLED"].includes(status)) {
      return res.status(400).json({
        message:
          "Acción no válida. Debe ser 'APPROVED' ,'REJECTED','ACTIVE' o 'CANCELLED'.",
      });
    }
    // Obtenemos los detalles del alquiler
    const rent = await selectRentByIdModel(rentId);

    // Si somos los dueños del alquiler lanzamos un error.
    if (rent.property_owner_id === req.user.id) {
      cannotAcceptRequestRentError();
    }
    const request = await checkRentalHistoryModel(requestId, rentId);
    if (request.length === 0) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }
    if (request[0].status !== "PENDING") {
      return res.status(400).json({
        message: "Solo se pueden aceptar o rechazar solicitudes pendientes.",
      });
    }

    await approveVisitModel(renthistoryId, req.user.id);
    res.send({
      status: "ok",
      message: "Status cambiado ",
    });
  } catch (err) {
    next(err);
  }
};

export default approveVisitController;
