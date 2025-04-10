import { randomUUID as uuid } from "crypto";
import getPool from "../../db/getPool.js";

const newRentModel = async (
  property_owner_id,
  address,
  price,
  num_rooms,
  availability_date,
  description
) => {
  const pool = await getPool();
  const rent_id = uuid();

  const created_at = new Date();
  const modified_at = new Date();

  await pool.query(
    `
    INSERT INTO rent (
      id,
      property_owner_id,
      address,
      price,
      num_rooms,
      availability_date,
      description,
      is_available,
      is_approved,
      created_at,
      modified_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      rent_id,
      property_owner_id,
      address,
      price,
      num_rooms,
      availability_date,
      description,
      true,
      false,
      created_at,
      modified_at,
    ]
  );

  return rent_id;
};

export default newRentModel;
