import getPool from "../../db/getPool.js";

const selectAllListRentModel = async () => {
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
r.property_owner_id
FROM rents r
`
  );
  return rents;
};

export default selectAllListRentModel;
