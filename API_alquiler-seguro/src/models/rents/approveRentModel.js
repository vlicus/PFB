import getPool from "../../db/getPool.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";
import sendMailUtil from "../../utils/sendMailUtil.js";

const approveRentModel = async (rentId) => {
  const pool = await getPool();

  const [[rents]] = await pool.query(
    `SELECT is_approved, property_owner_id FROM rents WHERE id = ?`,
    [rentId]
  );

  console.log(rents);

  if (rents.length === 0) {
    generateErrorUtil("El alquiler no existe", 404);
  }

  if (rents.is_approved === 1) {
    generateErrorUtil("El alquiler ya fue aprobado", 400);
  }

  const [[{ email }]] = await pool.query(
    `
    SELECT u.email FROM rents r JOIN users u ON r.property_owner_id = ?;
    `,
    [rents.property_owner_id]
  );

  console.log(email);
  //Verificación por email:

  const emailSubject =
    "Actualización sobre la creación de su alquiler en Alquiler Seguro";

  //Contenido del email:

  const emailBody = `
  Hola!

  Nos agrada contactarle para confirmar que su alquiler ha sido creado satisfactoriamente, esperemos que encuentre el inquilino perfecto!

  Un cordial saludo
  Alquiler Seguro
        `;

  // Enviamos el email de verificación al usuario.
  await sendMailUtil(email, emailSubject, emailBody);

  await pool.query(
    `UPDATE rents SET is_approved = 1, modified_at = NOW() WHERE id = ?`,
    [rentId]
  );

  return { rentId, status: "approved" };
};

export default approveRentModel;
