// Importamos la función que retorna una conexión con la base de datos.
import getPool from "../db/getPool.js";

// Importamos la función que genera un error.
import generateErrorUtil from "../utils/generateErrorUtil.js";

// Función controladora intermedia que comprueba si la entrada existe.
const userExistsController = async (req, res, next) => {
  try {
    // Obtenemos el ID de la entrada.
    // Intentamos obtener el id de usuario de la propiedad "user". Si dicha propiedad
    // no existe, obtenemos el id de los path params.
    const userId = req.user?.id || req.params.userId;

    // Obtenemos una conexión con la base de datos.
    const pool = await getPool();

    // Obtenemos la entrada.
    const [users] = await pool.query(`SELECT id FROM users WHERE id = ?`, [
      userId,
    ]);

    // Si la entrada no existe lanzamos un error.
    if (users.length < 1) {
      generateErrorUtil("Usuario no encontrado", 404);
    }

    // Avanzamos a la siguiente función controladora.
    next();
  } catch (err) {
    next(err);
  }
};

export default userExistsController;
