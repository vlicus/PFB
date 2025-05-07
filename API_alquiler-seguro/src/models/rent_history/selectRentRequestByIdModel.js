// Importamos la función que devuelve una conexión con la base de datos.
import getPool from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para obtener información de un alquiler concreto.
const selectRentRequestByIdModel = async (requestId) => {
  const pool = await getPool();

  // Comprobamos si hay algúna solicitud de alquiler con el id proporcionado.
  const [[rent_request]] = await pool.query(
    `SELECT
    rh.id,
    rh.rent_id,
    rh.renter_id,
    renter.username AS renter_username,
    renter.email,
    renter.phone_number,
    renter.first_name,
    renter.last_name,
    r.property_owner_id,
    owner.username AS owner_username,
    r.address,
    r.price,
    r.num_rooms,
    r.is_available,
    r.city,
    rh.start_date,
    rh.end_date,
    rh.status,
    rh.created_at
    FROM rental_history rh
    JOIN users renter ON rh.renter_id = renter.id
    JOIN rents r ON rh.rent_id = r.id
    JOIN users owner ON r.property_owner_id = owner.id
    AND rh.id = ?;
`,
    [requestId]
  );

  // Obtenemos el array de fotos del alquiler.
  const [photos] = await pool.query(
    `SELECT id, name FROM rent_images WHERE rent_id = ?`,
    [rent_request.rent_id]
  );

  // Agregamos el array de fotos al alquiler.
  rent_request.photos = photos;

  return {
    ...rent_request,
    photos,
  };
};

export default selectRentRequestByIdModel;
