// Importamos las dependencias.
import { randomUUID as uuid } from "crypto";

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para agregar una foto a una entrada.
const insertPhotoModel = async (photoName, rentId) => {
  const pool = await getPool();

  // Insertamos la foto.
  await pool.query(`INSERT INTO rent_images(name, rent_id) VALUES( ?, ?)`, [
    photoName,
    rentId,
  ]);

  return photoName;
};

export default insertPhotoModel;
