// Importamos los modelos.
import selectRentByIdModel from "../models/rents/selectRentByIdModel.js";

// Importamos los errores.
import generateErrorUtil from "../utils/generateErrorUtil.js";

// Función controladora intermedia que comprueba si un usuario tiene permiso para editar
// una entrada.
const canEditController = async (req, res, next) => {
  try {
    // Obtenemos el id de la entrada en la cuál tendra lugar el cambio.
    const { rentId } = req.params;

    // Obtenemos los datos de la entrada.
    const rent = await selectRentByIdModel(rentId);

    // Si no somos los propietarios lanzamos un error.
    if (rent.property_owner_id !== req.user.id) {
      generateErrorUtil(
        "El usuario no está autorizado para hacer esta operación",
        409
      );
    }

    // Pasamos el control a la siguiente función controladora.
    next();
  } catch (err) {
    next(err);
  }
};

export default canEditController;
