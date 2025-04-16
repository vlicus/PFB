import getPool from "../../db/getPool.js";

const checIfRentalHistoryExistsModel = async (requestId) => {
  const pool = await getPool();

  // Comprobamos si la solicitud existe y si el propietario del alquiler es el dueño de la propiedad
  const [request] = await pool.query(
    `SELECT * FROM rental_history WHERE id = ?`,
    [requestId]
  );
  return request;
};

export default checIfRentalHistoryExistsModel;
