// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../db/getPool.js";

// Importamos los errores.
import { notFoundError } from "../services/errorService.js";

const rentRequestExistsController = async (req, res, next) => {
  try {
    const pool = await getPool();

    // Obtenemos el id del alquiler de los path params.
    const { requestId } = req.params;
    const [requests] = await pool.query(
      `SELECT id FROM rental_history WHERE id = ?`,
      [requestId]
    );

    // Lanzamos un error si el alquiler no existe.
    if (requests.length < 1) {
      notFoundError("solicitud alquiler");
    }

    // Pasamos el control a la siguiente función controladora.
    next();
  } catch (err) {
    next(err);
  }
};

export default rentRequestExistsController;
