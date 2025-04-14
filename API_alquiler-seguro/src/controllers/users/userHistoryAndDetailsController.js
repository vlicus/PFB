import getPool from "../../db/getPool.js";

import generateErrorUtil from "../../utils/generateErrorUtil.js";

const userHistoryAndDetailsController = async (req, res, next) => {
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
    users.first_name,
    users.last_name,
    users.avatar,
    users.active,
    users.created_at,
    rental_history.id AS rental_id,
    rental_history.rents_id,
    rental_history.start_date,
    rental_history.end_date,
    rental_history.created_at AS rental_created_at
  FROM users
  LEFT JOIN rental_history ON users.id = rental_history.renter_id
  WHERE users.id = ?`,
      [req.user.id]
    );

    if (users.length < 1) {
      generateErrorUtil("Usuario no encontrado", 404);
    }

    const {
      id,
      username,
      email,
      phone_number,
      bio,
      first_name,
      last_name,
      avatar,
      active,
      created_at,
    } = users[0];

    const rental_history = users
      .filter((row) => row.rental_id !== null)
      .map((row) => ({
        rental_id: row.rental_id,
        rent_id: row.rents_id,
        start_date: row.start_date,
        end_date: row.end_date,
        created_at: row.rental_created_at,
      }));

    res.send({
      status: "ok",
      data: {
        user: {
          id,
          username,
          email,
          phone_number,
          bio,
          first_name,
          last_name,
          avatar,
          active,
          created_at,
          rental_history,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export default userHistoryAndDetailsController;
