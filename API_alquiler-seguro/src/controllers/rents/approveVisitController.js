import checkRentalHistoryModel from "../../models/rent_history/checkRentalHistoryModel.js";
import approveVisitModel from "../../models/rents/approveVisitModel.js";
import selectRentByIdModel from "../../models/rents/selectRentByIdModel.js";
import { notFoundError } from "../../services/errorService.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const approveVisitController = async (req, res, next) => {
  try {
    const { rentId, requestId } = req.params; // rentId y requestId desde los parámetros
    const { status } = req.body; // "APPROVED" o "REJECTED" desde el cuerpo de la solicitud

    if (!["APPROVED", "REJECTED", "ACTIVE", "CANCELLED"].includes(status)) {
      generateErrorUtil(
        "Acción no válida. Debe ser 'APPROVED' ,'REJECTED','ACTIVE' o 'CANCELLED",
        400
      );
    }
    // Obtenemos los detalles del alquiler
    const rent = await selectRentByIdModel(rentId);

    // Miramos que exista el alquiler con el id que le pasamos por params:
    if (!rent) {
      generateErrorUtil("El alquiler con ese id no existe", 409);
    }

    // Comprobamos si la solicitud existe y si el propietario del alquiler es el dueño de la propiedad
    const request = await checkRentalHistoryModel(requestId, rentId);
    if (request.length === 0) {
      notFoundError("solicitud alquiler.");
    }
    if (request[0].status !== "PENDING") {
      generateErrorUtil(
        "Solo se pueden modificar solicitudes en estado 'PENDING'"
      );
    }

    await approveVisitModel(status, requestId, rentId);
    res.send({
      status: "ok",
      message: "Status cambiado ",
    });
  } catch (err) {
    next(err);
  }
};

export default approveVisitController;
