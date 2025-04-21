import updateUserPassWithRecoverModel from "../../models/users/updateUserPassWithRecoverModel.js";
import editUserPassWithRecoverSchema from "../../schemas/users/editUserPassWithRecoverSchema.js";
import validateSchemaUtil from "../../utils/validateSchemaUtil.js ";

const editUserPassWithRecoverController = async (req, res, next) => {
  try {
    const { email, recoverPassCode, newPass } = req.body;

    await validateSchemaUtil(editUserPassWithRecoverSchema, req.body);

    await updateUserPassWithRecoverModel(email, recoverPassCode, newPass);

    res.send({
      status: "ok",
      message: "Contraseña actualizada",
    });
  } catch (err) {
    next(err);
  }
};

export default editUserPassWithRecoverController;
