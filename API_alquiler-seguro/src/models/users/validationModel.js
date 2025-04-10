import getPool from "../../db/getPool.js";
import sendMailUtil from "../../utils/sendMailUtil.js";

const validationModel = async (email) => {
  const pool = await getPool();

  if (email) {
    await pool.query(
      `
          UPDATE users SET active = ? WHERE email = ?
          `,
      [true, email]
    );
  }

  // Asunto del email de activación del email
  const emailSubject = "Validación de email en Alquiler Seguro";

  // Contenido del email:
  const emailBody = `
    La activación de su email: ${email} ha sido realizada correctamente!
    `;

  await sendMailUtil(email, emailSubject, emailBody);
};

export default validationModel;
