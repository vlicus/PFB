import getPool from "../../db/getPool.js";

const getAllRentRequestModel = async () => {
  const pool = await getPool();

  const [rent_requests] = await pool.query(
    `SELECT
    id,
    rent_id,
    renter_id,
    start_date,
    end_date,
    status,
    created_at
    FROM rental_history
`
  );
  return rent_requests;
};

export default getAllRentRequestModel;
