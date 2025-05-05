import getPool from "../../db/getPool.js";

const listCitiesController = async (req, res, next) => {
  try {
    const pool = await getPool();
    const [cities] = await pool.query(`
      SELECT DISTINCT city FROM rents WHERE city IS NOT NULL AND city <> ''
    `);

    res.send({ status: "ok", data: cities.map((c) => c.city) });
  } catch (err) {
    next(err);
  }
};

export default listCitiesController;
