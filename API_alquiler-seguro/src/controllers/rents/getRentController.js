// Importamos los modelos.
import selectRentByIdModel from "../../models/rents/selectRentByIdModel.js";

// Función controladora final que retorna una entrada con un id dado.
const getRentController = async (req, res, next) => {
  try {
    // Obtenemos el id de la entrada.
    const { rentId } = req.params;

    // Dado que queremos permitir que un usuario no logeado acceda a este controlador,
    // habrá momentos en los que no exista "req.user". Con la interrogación indicamos
    // a JavaScript que "user" puede ser undefined.
    const entry = await selectRentByIdModel(rentId, req.user?.id);

    res.send({
      status: "ok",
      data: {
        entry,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default getRentController;
