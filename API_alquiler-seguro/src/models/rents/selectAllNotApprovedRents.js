import getPool from "../../db/getPool.js";

const selectAllNotApprovedRents = async () => {
  const pool = await getPool();

  const [rents] = await pool.query(
    `SELECT
      r.id,
      r.address,
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
    WHERE r.is_approved = 0
    GROUP BY r.id
    `
  );

  return rents;
};

export default selectAllNotApprovedRents;
