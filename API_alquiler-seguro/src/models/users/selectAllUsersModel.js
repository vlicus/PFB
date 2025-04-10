// Importamos la función que devuelve una conexión con la base de datos.

import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para obtener el listado de entradas.
const selectAllUsersModel = async () => {
  const pool = await getPool();

  const [users] = await pool.query("SELECT username, email FROM users");

  return users;
};

export default selectAllUsersModel;
