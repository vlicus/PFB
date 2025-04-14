import approveRentModel from "../../models/rents/approveRentModel.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const approveRentController = async (req, res, next) => {
  try {
    const { id } = req.params;

    await approveRentModel(id);
    res.send({
      status: "ok",
      message: "Alquiler aprobado correctamente",
    });
  } catch (err) {
    generateErrorUtil(error);
  }
};

export default approveRentController;
