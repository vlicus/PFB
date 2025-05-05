import generateErrorUtil from "../../utils/generateErrorUtil.js";
import bcrypt from "bcryptjs";
import getPool from "../../db/getPool.js";
import selectUserByEmailModel from "./selectUserByEmailModel.js";

const updateUserPassWithRecoverModel = async (
  email,
  recoverPassCode,
  newPass
) => {
  const pool = await getPool();

  // Obtenemos al usuario en base al email recibido.
  const user = await selectUserByEmailModel(email);

  // Si no encontramos ningún usuario o si el código es incorrecto lanzamos un error.
  if (!user || user.recovery_code !== recoverPassCode) {
    generateErrorUtil("Código de recuperación incorrecto", 401);
  }

  // Encriptamos la nueva contraseña.
  const hashedPass = await bcrypt.hash(newPass, 10);

  // Actualizamos el usuario.
  await pool.query(
    `UPDATE users SET password = ?, recovery_code = null WHERE recovery_code = ?`,
    [hashedPass, recoverPassCode]
  );
};

export default updateUserPassWithRecoverModel;
