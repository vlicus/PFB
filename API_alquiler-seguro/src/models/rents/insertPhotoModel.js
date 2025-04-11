// Importamos las dependencias.
import { randomUUID as uuid } from "crypto";

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para agregar una foto a una entrada.
const insertPhotoModel = async (photoName, entryId) => {
  const pool = await getPool();

  // Generamos el id de la foto.
  const photoId = uuid();

  // Insertamos la foto.
  await pool.query(
    `INSERT INTO rent_images(id, name, entryId) VALUES(?, ?, ?)`,
    [photoId, photoName, entryId]
  );

  return photoId;
};

export default insertPhotoModel;
