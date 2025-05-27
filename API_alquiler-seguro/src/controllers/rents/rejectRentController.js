import rejectRentModel from "../../models/rents/rejectRentModel.js";
import getPool from "../../db/getPool.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const approveRentController = async (req, res, next) => {
  try {
    const { rentId } = req.params;
    const userId = req.user.id;

    const pool = await getPool();

    const [[user]] = await pool.query(
      `SELECT is_admin FROM users WHERE id = ?`,
      [userId]
    );
    if (!user || user.is_admin !== 1) {
      generateErrorUtil("No tienes permisos para aprobar alquileres", 403);
    }

    const result = await rejectRentModel(rentId);

    res.send({
      status: "ok",
      message: "Alquiler aprobado correctamente",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export default approveRentController;
