// Importamos los modelos.

import selectRentRequestByIdModel from "../../models/rent_history/selectRentRequestByIdModel.js";

// Función controladora final que retorna un alquiler con un id dado.
const getRentRequestController = async (req, res, next) => {
  try {
    // Obtenemos el id del alquiler.
    const { requestId } = req.params;

    const request = await selectRentRequestByIdModel(requestId, req.user.id);

    res.send({
      status: "ok",
      data: {
        request,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default getRentRequestController;
