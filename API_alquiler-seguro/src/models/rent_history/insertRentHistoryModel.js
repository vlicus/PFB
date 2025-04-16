import getPool from "../../db/getPool.js";
import sendMailUtil from "../../utils/sendMailUtil.js";

const insertRentHistoryModel = async (rentId, renterId) => {
  const pool = await getPool();

  // Insertamos la socilitud.
  await pool.query(
    `INSERT INTO rental_history( rent_id, renter_id, status) VALUES( ?, ?, ?)`,
    [rentId, renterId, "PENDING"]
  );

  let [[owner]] = await pool.query(
    `SELECT * FROM users u
inner join rents r on u.id = r.property_owner_id
inner join rental_history rh on rh.rent_id = r.id
where rh.rent_id = ?`,
    [rentId]
  );

  const emailSubject = "Solicitud de visita/alquiler en Alquiler Seguro";
  const emailBody = `
    Hola ${owner.username}!
  
    Te ha llego una solicitud de visita/alquiler a uno de tus alquileres, revisa tu apartado de solicitudes
          `;
  // Enviamos el email con la solicitud.
  await sendMailUtil(owner.email, emailSubject, emailBody);
};

export default insertRentHistoryModel;
