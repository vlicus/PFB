import insertRentModel from "../../models/rents/insertRentModel.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

const newRentController = async (req, res, next) => {
  try {
    const { address, price, num_rooms, description } = req.body;

    if (!address || !price) {
      return res.status(400).json({
        status: "error",
        message:
          "Faltan campos obligatorios: address, price, numero de habitaciones, descripción",
      });
    }
    const userId = req.user.id;
    console.log("REQ.USER:", req.user.id);
    const rentId = await insertRentModel(
      userId,
      address,
      price,
      num_rooms,
      description
    );

    res.send({
      status: "ok",
      message: `Alquiler creado con id ${rentId}`,
    });
  } catch (error) {
    generateErrorUtil(error);
  }
};

export default newRentController;
