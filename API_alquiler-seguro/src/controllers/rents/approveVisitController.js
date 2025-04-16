import checkRentalHistoryModel from "../../models/rent_history/checkRentalHistoryModel.js";
import approveVisitModel from "../../models/rents/approveVisitModel.js";
import selectRentByIdModel from "../../models/rents/selectRentByIdModel.js";
import {
  onlyCanAcceptPendingRequestError,
  notFoundError,
  notValidStatusRequestError,
} from "../../services/errorService.js";

const approveVisitController = async (req, res, next) => {
  try {
    const { rentId, requestId } = req.params; // rentId y requestId desde los parámetros
    const { status } = req.body; // "APPROVED" o "REJECTED" desde el cuerpo de la solicitud

    if (!["APPROVED", "REJECTED", "ACTIVE", "CANCELLED"].includes(status)) {
      notValidStatusRequestError();
    }
    // Obtenemos los detalles del alquiler
    const rent = await selectRentByIdModel(rentId);

    const request = await checkRentalHistoryModel(requestId, rentId);
    if (request.length === 0) {
      notFoundError("solicitud alquiler.");
    }
    if (request[0].status !== "PENDING") {
      onlyCanAcceptPendingRequestError();
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
