// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para actualizar el avatar de un usuario.
const updateUserModel = async (userId, fieldsToUpdate) => {
  const pool = await getPool();

  const keys = Object.keys(fieldsToUpdate);
  if (keys.length === 0) return; // Nada que actualizar

  const setClause = keys.map((key) => `${key} = ?`).join(", ");
  const values = keys.map((key) => fieldsToUpdate[key]);

  values.push(userId);

  const query = `UPDATE users SET ${setClause} WHERE id = ?`;

  await pool.query(query, values);
};

export default updateUserModel;
