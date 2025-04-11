import getPool from "../../db/getPool.js";

const selectAllListRentModel = async () => {
  const pool = await getPool();

  const [rents] = await pool.query(
    `SELECT
    r.id,
    r.adress,
    r.price,
r.num_rooms,
r.description,
r.is_available,
r.is_approved,
r.property_owner_id
FROM rent r
`
  );
  return rents;
};

export default selectAllListRentModel;
