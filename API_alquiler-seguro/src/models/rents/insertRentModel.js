import { randomUUID } from "crypto";
import getPool from "../../db/getPool.js";

const insertRentModel = async (
  property_owner_id,
  address,
  price,
  num_rooms,
  description
) => {
  const pool = await getPool();

  const rentId = randomUUID();

  await pool.query(
    `INSERT INTO rents (id, property_owner_id, address, price, num_rooms, description)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [rentId, property_owner_id, address, price, num_rooms, description]
  );

  return rentId;
};

export default insertRentModel;
