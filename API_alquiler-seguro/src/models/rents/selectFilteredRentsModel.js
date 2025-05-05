import getPool from "../../db/getPool.js";

const selectFilteredRentsModel = async ({ city, maxPrice, minRooms }) => {
  const pool = await getPool();

  let query = `
  SELECT
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
  WHERE r.is_approved = 1
  AND r.is_available = 1
  `;
  const values = [];

  if (city && city !== "undefined" && city !== "") {
    query += " AND r.city LIKE ?";
    values.push(`%${city}%`);
  }
  console.log("city recibido en model:", city);
  if (maxPrice && maxPrice !== "undefined" && !isNaN(maxPrice)) {
    query += " AND r.price <= ?";
    values.push(Number(maxPrice));
  }

  if (minRooms && minRooms !== "undefined" && !isNaN(minRooms)) {
    query += " AND r.num_rooms >= ?";
    values.push(Number(minRooms));
  }

  query += " GROUP BY r.id ORDER BY r.price DESC";

  console.log("QUERY:", query);
  console.log("VALUES:", values);

  const [rents] = await pool.query(query, values);
  return rents;
};

export default selectFilteredRentsModel;
