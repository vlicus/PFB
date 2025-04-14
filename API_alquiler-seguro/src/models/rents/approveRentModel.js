import approveRentModel from "../../models/rents/approveRentModel.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const approveRentController = async (req, res, next) => {
  try {
    const { rentId } = req.params;
    const userId = req.auth.id;

    await approveRentModel(rentId, userId);

    res.send({
      status: "ok",
      message: "Alquiler aprobado correctamente",
    });
  } catch (err) {
    generateErrorUtil(error);
  }
};

export default approveRentController;
