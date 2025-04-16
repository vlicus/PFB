import updateUserPassModel from "../../models/users/updateUserPassModel.js";
import editUserPassSchema from "../../schemas/users/editUserPassSchema.js";
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

const userPasswordChangeController = async (req, res, next) => {
  try {
    const { email, password, newPassword } = req.body;

    // Validamos el body con Joi.
    await validateSchemaUtil(editUserPassSchema, req.body);

    await updateUserPassModel(email, password, newPassword);

    res.send({
      status: "ok",
      message: "Contraseña actualizada",
    });
  } catch (err) {
    next(err);
  }
};

export default userPasswordChangeController;
