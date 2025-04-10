// Importamos los modelos.
import selectAllUsersModel from "../../models/users/selectAllUsersModel.js";

// Función controladora final que retorna el listado de entradas. Permite filtrar por palabra
// clave.
const listUsersController = async (req, res, next) => {
  try {
    const users = await selectAllUsersModel();

    res.send({
      status: "ok",
      data: {
        users,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default listUsersController;
