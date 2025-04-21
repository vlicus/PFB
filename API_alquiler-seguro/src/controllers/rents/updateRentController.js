import updateRentSchema from "../../schemas/rents/updateRentSchema.js";
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";
// Importamos los servicios.

import updateRentModel from "../../models/rents/updateRentModel.js";

const updateRentController = async (req, res, next) => {
  try {
    const { rentId } = req.params;

    // Validamos el body con Joi.
    await validateSchemaUtil(updateRentSchema, req.body);

    // Actualizamos los datos de texto del usuario
    await updateRentModel(rentId, req.body);

    res.send({
      status: "ok",
      message: "Alquiler actualizado",
    });
  } catch (err) {
    next(err);
  }
};

export default updateRentController;
