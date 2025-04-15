import getPool from "../../db/getPool.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const getUserDetailsModel = async (userId) => {
  const pool = await getPool();

  const [users] = await pool.query(
    `
    SELECT 
      username,
      email,
      phone_number,
      bio,
      password,
      first_name,
      last_name,
      avatar,
      active,
      created_at
    FROM users
    WHERE id = ?
  `,
    [userId]
  );

  if (users.length < 1) {
    throw generateErrorUtil("Usuario no encontrado", 404);
  }

  return users[0];
};

export default getUserDetailsModel;
