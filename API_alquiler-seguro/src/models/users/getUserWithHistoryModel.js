import getPool from "../../db/getPool.js";

const getUserWithHistoryModel = async (userId) => {
  const pool = await getPool();

  const [rows] = await pool.query(
    `
    SELECT 
      u.id AS user_id,
      u.username,
      u.email,
      u.phone_number,
      u.bio,
      u.first_name,
      u.last_name,
      u.avatar,
      u.active,
      u.created_at,
      rh.id AS rental_id,
      r.id AS rent_id,
      r.address,
      rh.status,
      rh.start_date,
      rh.end_date,
      r.property_owner_id,
      CASE
        WHEN r.property_owner_id = ? THEN true
        WHEN rh.renter_id = ? THEN false
        ELSE NULL
      END AS is_owner
    FROM users u
    LEFT JOIN rental_history rh ON u.id = rh.renter_id OR u.id = (
      SELECT property_owner_id FROM rents WHERE id = rh.rent_id
    )
    LEFT JOIN rents r ON rh.rent_id = r.id
    WHERE u.id = ?
    AND rh.status IN ("ACTIVE",  "COMPLETED")
    ORDER BY rh.created_at DESC
    `,
    [userId, userId, userId]
  );

  if (rows.length < 1) {
    throw new Error("Usuario no encontrado");
  }

  const {
    user_id,
    username,
    email,
    phone_number,
    bio,
    first_name,
    last_name,
    avatar,
    active,
    created_at,
  } = rows[0];

  const rental_history = rows
    .filter((row) => row.rental_id !== null)
    .map((row) => ({
      rent_id: row.rent_id,
      address: row.address,
      start_date: row.start_date,
      end_date: row.end_date,
      is_owner: row.is_owner,
      status: row.status,
    }));

  return {
    id: user_id,
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
  };
};

export default getUserWithHistoryModel;
