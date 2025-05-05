// Importamos los modelos.
import selectOwnRentsModel from "../../models/rents/selectOwnRentsModel.js";

// Función controladora final que retorna el listado de entradas.
const listOwnRentsController = async (req, res, next) => {
  try {
    const rents = await selectOwnRentsModel(req.user.id);

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
