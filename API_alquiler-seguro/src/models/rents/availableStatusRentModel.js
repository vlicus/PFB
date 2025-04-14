import getPool from "../../db/getPool.js";

const availableStatusRentModel = async (status, userdId, rentId) => {
  const pool = await getPool();

  await pool.query(
    `UPDATE rents SET is_available = ? WHERE property_owner_id = ? AND id = ?`,
    [status, userdId, rentId]
  );
};

export default availableStatusRentModel;
