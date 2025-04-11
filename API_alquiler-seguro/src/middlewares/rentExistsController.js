// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../db/getPool.js";

// Importamos los errores.
import { notFoundError } from "../services/errorService.js";

const rentExistsController = async (req, res, next) => {
  try {
    const pool = await getPool();

    // Obtenemos el id del alquiler de los path params.
    const { rentId } = req.params;

    const [rents] = await pool.query(`SELECT id FROM rent WHERE id = ?`, [
      rentId,
    ]);

    // Lanzamos un error si el alquiler no existe.
    if (rents.length < 1) {
      notFoundError("alquiler");
    }

    // Pasamos el control a la siguiente función controladora.
    next();
  } catch (err) {
    next(err);
  }
};

export default rentExistsController;
