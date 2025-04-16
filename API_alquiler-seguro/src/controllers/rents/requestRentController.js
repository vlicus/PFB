import insertRentHistoryModel from "../../models/rent_history/insertRentHistoryModel.js";
import selectRentByIdModel from "../../models/rents/selectRentByIdModel.js";
import { cannotRequestOwnRentError } from "../../services/errorService.js";

const requestRentController = async (req, res, next) => {
  try {
    // Obtenemos el id del alquiler de los path params.
    const { rentId } = req.params;

    // Obtenemos los detalles del alquiler
    const rent = await selectRentByIdModel(rentId);

    // Si somos los dueños del alquiler lanzamos un error.
    if (rent.property_owner_id === req.user.id) {
      cannotRequestOwnRentError();
    }

    await insertRentHistoryModel(rentId, req.user.id);

    res.send({
      status: "ok",
      message: "Solicitud efectuada, se ha notificado al casero via email",
    });
  } catch (err) {
    next(err);
  }
};

export default requestRentController;
