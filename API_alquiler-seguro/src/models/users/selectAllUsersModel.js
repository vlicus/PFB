// Importamos la función que devuelve una conexión con la base de datos.

import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para obtener el listado de usuarios.
const selectAllUsersModel = async () => {
  const pool = await getPool();

  const [users] = await pool.query(
    "SELECT username, email, phone_number,bio, password, first_name, last_name, avatar, active, is_admin, registration_code, recovery_code  FROM users"
  );

  return users;
};

export default selectAllUsersModel;
