import getPool from "../../db/getPool.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const validationModel = async (regcode) => {
  const pool = await getPool();

  if (!regcode) {
    generateErrorUtil("Código de validación obligatorio", 400);
  }

  if (regcode) {
    const [result] = await pool.query(
      `
          UPDATE users SET active = ?, registration_code = NULL WHERE registration_code = ?
          `,
      [true, regcode]
    );

    if (!result.affectedRows) {
      generateErrorUtil("Código de validación inválido", 404);
    }
  }
};

export default validationModel;
