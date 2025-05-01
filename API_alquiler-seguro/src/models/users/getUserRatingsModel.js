import getPool from "../../db/getPool.js";

const getUserRatingsModel = async (userId) => {
  const pool = await getPool();

  const [ratings] = await pool.query(
    `
    SELECT 
      r.id,
      r.rating,
      r.comment,
      r.rating_date,
      r.is_owner,
      rh.id AS rental_history_id,
      u.username AS renter_username,
      u.id AS renter_id
    FROM ratings r
    JOIN rental_history rh ON r.rental_history_id = rh.id
    JOIN users u ON r.author_id = u.id
    WHERE r.recipient_id = ?
    ORDER BY r.rating_date DESC
    `,
    [userId]
  );

  return ratings;
};

export default getUserRatingsModel;
