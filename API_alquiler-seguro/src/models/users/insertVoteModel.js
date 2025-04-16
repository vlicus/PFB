// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Importamos los errores.
import {
  visiteStillOnPending,
  voteAlreadyExistsError,
} from "../../services/errorService.js";

// Función que realiza una consulta a la base de datos para votar un usuario.
const insertVoteModel = async (
  rating,
  recipient_id,
  author_id,
  comment,
  rental_history_id
) => {
  const pool = await getPool();

  // Comprobamos si la visita ha sido aprobada
  const [[{ status }]] = await pool.query(
    `
    SELECT status FROM rental_history WHERE id = ?   
    `,
    [rental_history_id]
  );

  if (status === "PENDING") {
    visiteStillOnPending();
  }

  // Comprobamos si ya existe un voto previo por parte del usuario que está intentando votar.
  const [votes] = await pool.query(
    `SELECT id FROM ratings WHERE recipient_id = ? AND author_id = ?`,
    [author_id, recipient_id]
  );

  // Si la longitud del array de votos es mayor que cero lanzamos un error indicando que el usuario ya ha sido votada por este usuario.
  if (votes.length > 0) {
    voteAlreadyExistsError();
  }

  // Insertamos el voto con comentario
  await pool.query(
    `INSERT INTO ratings(rating, recipient_id, author_id, comment, rental_history_id) VALUES(?, ?, ?, ?, ?)`,
    [rating, recipient_id, author_id, comment, rental_history_id]
  );

  // Obtenemos la media de votos.
  const [votesAvg] = await pool.query(
    `SELECT AVG(rating) AS avg FROM ratings WHERE recipient_id = ?`,
    [recipient_id]
  );

  // Retornamos la media de votos.
  return Number(votesAvg[0].avg);
};

export default insertVoteModel;
