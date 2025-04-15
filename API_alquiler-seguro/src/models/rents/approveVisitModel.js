import getPool from "../../db/getPool.js";

const approveVisitModel = async (status, requestId, rentId) => {
  const pool = await getPool();

  // Actualizamos el estado de la solicitud
  await pool.query(
    `UPDATE rental_history SET status = ? WHERE id = ? AND rent_id = ?`,
    [status, requestId, rentId]
  );
};

export default approveVisitModel;
