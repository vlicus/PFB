// Importamos los modelos.
import getMyAllRentRequestModel from "../../models/rents/getMyAllRentRequestModel.js";

// Función controladora final que retorna el listado de entradas.
const listMyRentRequestController = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const rentRequests = await getMyAllRentRequestModel(userId);

    res.send({
      status: "ok",
      data: {
        rentRequests,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default listMyRentRequestController;
