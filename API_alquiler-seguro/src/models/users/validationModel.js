import getPool from "../../db/getPool.js"; /* 
import sendMailUtil from "../../utils/sendMailUtil.js"; */

const validationModel = async (regcode) => {
  const pool = await getPool();

  console.log(regcode);
  if (regcode) {
    let result = await pool.query(
      `
          UPDATE users SET active = ? WHERE registration_code = ?
          `,
      [true, regcode]
    );
    console.log(result);
  }

  // Asunto del email de activación del email
  const emailSubject = "Validación de email en Alquiler Seguro";

  // Contenido del email:
  const emailBody = `
    La activación de su email ha sido realizada correctamente!
    `;

  //await sendMailUtil(regcode, emailSubject, emailBody);
};

export default validationModel;
