// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para actualizar el avatar de un usuario.
const updateUserAvatarModel = async (avatarName, userId) => {
  const pool = await getPool();

  await pool.query(`UPDATE users SET avatar = ? WHERE id = ?`, [
    avatarName,
    userId,
  ]);
};

export default updateUserAvatarModel;
