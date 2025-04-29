import getPool from "../../db/getPool.js";

const getAllRentRequestModel = async (userId) => {
  const pool = await getPool();

  const [rent_requests] = await pool.query(
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
    rh.start_date,
    rh.end_date,
    rh.status,
    rh.created_at
    FROM rental_history rh
    JOIN users renter ON rh.renter_id = renter.id
    JOIN rents r ON rh.rent_id = r.id
    JOIN users owner ON r.property_owner_id = owner.id
    AND r.property_owner_id = ?;
`,
    [userId]
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
