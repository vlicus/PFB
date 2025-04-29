// Importamos los modelos.
import getAllApprovedRentModel from "../../models/rents/selectAllApprovedRents.js";

// Función controladora final que retorna el listado de entradas.
const listApprovedRentController = async (req, res, next) => {
  try {
    const rents = await getAllApprovedRentModel();

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

export default listApprovedRentController;
