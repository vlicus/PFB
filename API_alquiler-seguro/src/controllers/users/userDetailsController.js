import getPool from "../../db/getPool.js";

import generateErrorUtil from "../../utils/generateErrorUtil.js";

const userDetailsController = async (req, res, next) => {
  try {
    const pool = await getPool();

    const [users] = await pool.query(
      `
  SELECT 
    users.id,
    users.username,
    users.email,
    users.phone_number,
    users.bio,
    users.password,
    users.first_name,
    users.last_name,
    users.avatar,
    users.active,
    users.created_at
  FROM users
  WHERE users.id = ?`,
      [req.user.id]
    );

    if (users.length < 1) {
      generateErrorUtil("Usuario no encontrado", 404);
    }

    res.send({
      status: "ok",
      data: {
        user: users[0],
      },
    });
  } catch (err) {
    next(err);
  }
};

export default userDetailsController;
