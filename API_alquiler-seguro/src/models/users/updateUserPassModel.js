// Importamos las dependencias.
import bcrypt from "bcryptjs";

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Importamos los modelos.
import selectUserByEmailModel from "./selectUserByEmailModel.js";
import {
  notFoundError,
  passwordsNotMatchError,
} from "../../services/errorService.js";

// Función que realiza una consulta a la base de datos para actualizar la contraseña de un usuario.
const updateUserPassModel = async (email, pass, newPass) => {
  const pool = await getPool();

  // Obtenemos al usuario en base al email recibido.
  const user = await selectUserByEmailModel(email);

  if (!user) {
    notFoundError();
  }

  const validPass = await bcrypt.compare(pass, user.password);

  if (!validPass) {
    passwordsNotMatchError();
  }

  // Encriptamos la nueva contraseña.
  const hashedPass = await bcrypt.hash(newPass, 10);

  // Actualizamos el usuario.
  await pool.query(`UPDATE users SET password = ? WHERE email = ?`, [
    hashedPass,
    email,
  ]);
};

export default updateUserPassModel;
