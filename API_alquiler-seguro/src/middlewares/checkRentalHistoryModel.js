import getPool from "../db/getPool.js";

const checkRentalHistoryModel = async (requestId, rentId) => {
  const pool = await getPool();

  // Comprobamos si la solicitud existe y si el propietario del alquiler es el dueño de la propiedad
  const [request] = await pool.query(
    `SELECT * FROM rental_history WHERE id = ? AND rent_id = ?`,
    [requestId, rentId]
  );
  return request;
};

export default checkRentalHistoryModel;
