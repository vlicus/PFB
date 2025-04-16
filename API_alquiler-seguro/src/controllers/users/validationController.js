import validationModel from "../../models/users/validationModel.js";
import emailValidationSchema from "../../schemas/users/emailValidationSchema.js";
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

const validationController = async (req, res, next) => {
  try {
    const { email } = req.body;

    await validateSchemaUtil(emailValidationSchema, req.body);

    await validationModel(email);

    res.send({
      status: "ok",
      message: "Usuario validado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export default validationController;
