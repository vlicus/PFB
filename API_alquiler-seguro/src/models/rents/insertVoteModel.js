// Importamos las dependencias.
import { randomUUID as uuid } from "crypto";

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Importamos los errores.
import { voteAlreadyExistsError } from "../../services/errorService.js";

// Función que realiza una consulta a la base de datos para votar un alquiler.
const insertVoteModel = async (rating, recipient_id, author_id) => {
  const pool = await getPool();

  // Comprobamos si ya existe un voto previo por parte del usuario que está intentando votar.
  const [votes] = await pool.query(
    `SELECT id FROM ratings WHERE recipient_id = ? AND author_id = ?`,
    [author_id, recipient_id]
  );

  // Si la longitud del array de votos es mayor que cero lanzamos un error indicando que la entrada ya ha sido votada por este usuario.
  if (votes.length > 0) {
    voteAlreadyExistsError();
  }

  // Insertamos el voto con comentario
  await pool.query(
    `INSERT INTO ratings(id, rating, recipient_id, author_id, comment) VALUES(?, ?, ?, ?, ?)`,
    [uuid(), rating, recipient_id, author_id, comment]
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
