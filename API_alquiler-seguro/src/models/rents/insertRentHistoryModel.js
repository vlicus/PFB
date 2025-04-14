const insertRentHistoryModel = async (rentId, renterId) => {
  const pool = await getPool();

  // Insertamos la socilitud.
  await pool.query(
    `INSERT INTO rental_history(id, rent_id, renter_id, status) VALUES(?, ?, ?, ?, ?)`,
    [uuid(), rentId, renterId, "PENDING"]
  );
};

export default insertRentHistoryModel;
