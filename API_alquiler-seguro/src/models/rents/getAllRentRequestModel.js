import getPool from "../../db/getPool.js";

const getAllRentRequestModel = async () => {
  const pool = await getPool();

  const [rent_requests] = await pool.query(
    `SELECT
    rh.id,
    rh.rent_id,
    rh.renter_id,
    u.username,
    u.email,
    u.phone_number,
    u.first_name,
    u.last_name,
    r.property_owner_id,
    r.address,
    r.price,
    r.num_rooms,
    r.is_available,
    start_date,
    end_date,
    status,
    rh.created_at
    FROM rental_history rh
    JOIN users u ON rh.renter_id = u.id
    JOIN rents r ON rh.rent_id = r.id
    WHERE rh.status = "PENDING";
`
  );

  for (const rent_request of rent_requests) {
    // Buscamos las fotos de la entrada.
    const [[photo]] = await pool.query(
      `SELECT id, name FROM rent_images WHERE rent_id = ?`,
      [rent_request.rent_id]
    );

    // Agregamos las fotos a la entrada.
    rent_request.photo = photo?.name;
  }
  return rent_requests;
};

export default getAllRentRequestModel;
