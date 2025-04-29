// Importamos los modelos.
import getAllNotApprovedRentModel from "../../models/rents/selectAllNotApprovedRents.js";

// Función controladora final que retorna el listado de rentas no aprobadas.
const notApprovedRentController = async (req, res, next) => {
  try {
    const rents = await getAllNotApprovedRentModel();

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

export default notApprovedRentController;
