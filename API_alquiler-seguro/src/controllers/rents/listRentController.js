// Importamos los modelos.
import selectAllListRentModel from "../../models/rents/selectAllListRentModel";

// Función controladora final que retorna el listado de entradas.
const listRentController = async (req, res, next) => {
  try {
    const rents = await selectAllListRentModel();

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

export default listRentController;
