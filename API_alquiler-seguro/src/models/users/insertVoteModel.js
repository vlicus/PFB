import getPool from "../../db/getPool.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const insertVoteModel = async (
  rating,
  recipient_id,
  author_id,
  comment,
  rental_history_id
) => {
  const pool = await getPool();

  // Comprobamos si la solicitud de alquiler está aprobada.
  const [[{ status }]] = await pool.query(
    `SELECT status FROM rental_history WHERE id = ?`,
    [rental_history_id]
  );

  if (status === "PENDING") {
    generateErrorUtil("La solicitud está todavía en 'PENDING'", 409);
  }

  // Comprobamos si ya existe un voto.
  const [votes] = await pool.query(
    `SELECT id FROM ratings WHERE recipient_id = ? AND author_id = ? AND rental_history_id = ?`,
    [recipient_id, author_id, rental_history_id]
  );

  if (votes.length > 0) {
    generateErrorUtil(
      "No puedes votar dos veces al mismo usuario sobre la misma solicitud",
      409
    );
  }

  //  obtenemos si el usuario valorado es casero o inquilino
  const [[{ property_owner_id }]] = await pool.query(
    `SELECT r.property_owner_id
     FROM rental_history rh
     JOIN rents r ON rh.rent_id = r.id
     WHERE rh.id = ?`,
    [rental_history_id]
  );

  const isOwner = property_owner_id === recipient_id ? 1 : 0; // Si el valorado es casero → 1, si es inquilino → 0

  // Insertamos el voto.
  await pool.query(
    `INSERT INTO ratings(rating, recipient_id, author_id, comment, rental_history_id, is_owner) VALUES(?, ?, ?, ?, ?, ?)`,
    [rating, recipient_id, author_id, comment, rental_history_id, isOwner]
  );

  // Obtenemos la media de votos del usuario valorado.
  const [votesAvg] = await pool.query(
    `SELECT AVG(rating) AS avg FROM ratings WHERE recipient_id = ?`,
    [recipient_id]
  );

  return Number(votesAvg[0].avg);
};

export default insertVoteModel;
