// Importamos la función que devuelve una conexión con la base de datos.
import { API_URL, FRONT_PORT } from "../../../env.js";
import getPool from "../../db/getPool.js";

// Importamos los servicios.
import sendMailUtil from "../../utils/sendMailUtil.js";

// Función que realiza una consulta a la base de datos para actualizar el avatar de un usuario.
const sendRecoverPassModel = async (email, recovery_code) => {
  const pool = await getPool();

  // Actualizamos el código de recuperación de contraseña del usuario.
  await pool.query(`UPDATE users SET recovery_code = ? WHERE email = ?`, [
    recovery_code,
    email,
  ]);

  // Creamos el asunto del email de recuperación de contraseña.
  const emailSubject = "Recuperación de contraseña en Alquiler Seguro :)";

  // Creamos el contenido del email
  const emailBody = `
            Se ha solicitado la recuperación de contraseña para este email en Alquiler Seguro. 
                
            Utiliza el siguiente código para crear una nueva contraseña: ${recovery_code} haciendo click en el siguiente enlace:
            
            <a href="${API_URL + ":" + FRONT_PORT}/passwordRecovery">Recuperar contraseña</a>

            Si no has sido tú ignora este email.
        `;

  // Enviamos el email de verificación al usuario.
  await sendMailUtil(email, emailSubject, emailBody);
};

export default sendRecoverPassModel;
