import insertRentHistoryModel from "../../models/rent_history/insertRentHistoryModel.js";
import selectRentByIdModel from "../../models/rents/selectRentByIdModel.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const requestRentController = async (req, res, next) => {
  try {
    // Obtenemos el id del alquiler de los path params.
    const { rentId } = req.params;

    // Obtenemos los detalles del alquiler
    const rent = await selectRentByIdModel(rentId);

    // Si somos los dueños del alquiler lanzamos un error.
    if (rent.property_owner_id === req.user.id) {
      generateErrorUtil("No puedes alquilarte tu piso a ti mismo!", 500);
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
