import getPool from "../../db/getPool.js"; /* 
import sendMailUtil from "../../utils/sendMailUtil.js"; */

const validationModel = async (regcode) => {
  const pool = await getPool();

  if (regcode) {
    await pool.query(
      `
          UPDATE users SET active = ? WHERE registration_code = ?
          `,
      [true, regcode]
    );
  }
};

export default validationModel;
