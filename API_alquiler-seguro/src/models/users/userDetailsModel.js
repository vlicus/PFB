import getPool from "../../db/getPool.js";

const userDetailsModel = async (userId) => {
  const pool = await getPool();
  const [user] = await pool.query(
    ` 
  SELECT 
    users.id,
    users.username,
    users.email,
    users.phone_number,
    users.bio,
    users.password,
    users.first_name,
    users.last_name,
    users.avatar,
    users.active,
    users.created_at
  FROM users
  WHERE users.id = ?`,
    [req.user.id]
  );
  return user[0];
};

export default userDetailsModel;
