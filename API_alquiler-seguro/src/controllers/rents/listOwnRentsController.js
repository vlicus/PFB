// Importamos los modelos.
import selectAllListRentModel from "../../models/rents/selectAllListRentModel.js";

// Función controladora final que retorna el listado de entradas.
const listOwnRentsController = async (req, res, next) => {
  try {
    const rents = await selectAllListRentModel(req.user.id);

    res.send({
      status: "ok",
      data: {
        rents,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default listOwnRentsController;
