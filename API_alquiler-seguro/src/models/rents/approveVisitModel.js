import getPool from "../../db/getPool.js";

const approveVisitModel = async (status, requestId, rentId) => {
  const pool = await getPool();

  if (status === "APPROVED" || status === "REJECTED") {
    // Actualizamos el estado de la solicitud
    await pool.query(
      `UPDATE rental_history SET status = ? WHERE id = ? AND rent_id = ?`,
      [status, requestId, rentId]
    );
  }
  if (status === "ACTIVE") {
    // Activamos la solicitud actual y ponemos la fecha de inicio
    await pool.query(
      `UPDATE rental_history SET status = ?, start_date = NOW() WHERE id = ? AND rent_id = ?`,
      [status, requestId, rentId]
    );

    // Cancelamos las demás solicitudes con el mismo rent_id
    await pool.query(
      `UPDATE rental_history SET status = 'CANCELLED' 
        WHERE rent_id = ? AND id != ? AND status != 'CANCELLED'`,
      [rentId, requestId]
    );

    await pool.query(`UPDATE rents SET is_available = 0 WHERE id = ? `, [
      rentId,
    ]);
  }
  if (status === "COMPLETED" || status === "CANCELLED") {
    await pool.query(
      `UPDATE rental_history SET status = ?, end_date = NOW() WHERE id = ? AND rent_id = ?`,
      [status, requestId, rentId]
    );

    await pool.query(`UPDATE rents SET is_available = 1 WHERE id = ? `, [
      rentId,
    ]);
  }
};

export default approveVisitModel;
