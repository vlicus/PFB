// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para obtener información de un alquiler concreto.
const selectRentByIdModel = async (rentId) => {
  const pool = await getPool();

  // Comprobamos si hay algún alquiler con el id proporcionado.
  const [[rents]] = await pool.query(
    `SELECT id, property_owner_id, address, price, num_rooms, description , is_available, created_at FROM rents WHERE id = ?`,
    [rentId]
  );

  // Obtenemos el array de fotos del alquiler.
  const [photos] = await pool.query(
    `SELECT id, name FROM rent_images WHERE rent_id = ?`,
    [rentId]
  );
  // Agregamos el array de fotos al alquiler.
  rents.photos = photos;

  return {
    ...rents,
    photos,
  };
};

export default selectRentByIdModel;
