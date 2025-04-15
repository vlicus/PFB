import approveRentModel from "../../models/rents/approveRentModel.js";
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
      throw generateErrorUtil(
        "No tienes permisos para aprobar alquileres",
        403
      );
    }

    const result = await approveRentModel(rentId);

    res.send({
      status: "ok",
      message: "Alquiler aprobado correctamente",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default approveRentController;
