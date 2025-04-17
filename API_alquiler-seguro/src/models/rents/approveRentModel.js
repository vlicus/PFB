import getPool from "../../db/getPool.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const approveRentModel = async (rentId) => {
  const pool = await getPool();

  const [rents] = await pool.query(
    `SELECT is_approved FROM rents WHERE id = ?`,
    [rentId]
  );

  if (rents.length === 0) {
    generateErrorUtil("El alquiler no existe", 404);
  }

  if (rents[0].is_approved === 1) {
    generateErrorUtil("El alquiler ya fue aprobado", 400);
  }

  await pool.query(
    `UPDATE rents SET is_approved = 1, modified_at = NOW() WHERE id = ?`,
    [rentId]
  );

  return { rentId, status: "approved" };
};

export default approveRentModel;
