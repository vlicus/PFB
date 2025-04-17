import getPool from "../../db/getPool.js";

const selectFilteredRentsModel = async ({ address, maxPrice, minRooms }) => {
  const pool = await getPool();

  let query = `
    SELECT
      r.id,
      r.address,
      r.price,
      r.num_rooms,
      r.description,
      r.is_available,
      r.is_approved,
      r.property_owner_id
    FROM rents r
    WHERE 1=1
  `;

  const values = [];

  if (address && address !== "undefined" && address !== "") {
    query += " AND r.address LIKE ?";
    values.push(`%${address}%`);
  }

  if (maxPrice && maxPrice !== "undefined" && !isNaN(maxPrice)) {
    query += " AND r.price <= ?";
    values.push(Number(maxPrice));
  }

  if (minRooms && minRooms !== "undefined" && !isNaN(minRooms)) {
    query += " AND r.num_rooms >= ?";
    values.push(Number(minRooms));
  }

  query += " ORDER BY r.price DESC";

  console.log("QUERY:", query);
  console.log("VALUES:", values);

  const [rents] = await pool.query(query, values);
  return rents;
};

export default selectFilteredRentsModel;
