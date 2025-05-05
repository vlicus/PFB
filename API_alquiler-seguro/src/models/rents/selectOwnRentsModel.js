import getPool from "../../db/getPool.js";

const selectOwnRentsModel = async (userId) => {
  const pool = await getPool();

  const [rents] = await pool.query(
    `SELECT
    r.id,
    r.address,
    r.city,
    r.price,
    r.num_rooms,
    r.description,
    r.is_available,
    r.is_approved,
    r.property_owner_id,
    u.username AS property_owner_username,
    JSON_ARRAYAGG(ri.name) AS images
    FROM rents r
    LEFT JOIN rent_images ri ON r.id = ri.rent_id
    LEFT JOIN users u ON r.property_owner_id = u.id
    WHERE r.property_owner_id = ?
    GROUP BY r.id
  `,
    [userId]
  );
  return rents;
};

export default selectOwnRentsModel;
