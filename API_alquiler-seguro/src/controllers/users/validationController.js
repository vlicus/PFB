import validationModel from "../../models/users/validationModel.js";

const validationController = async (req, res, next) => {
  try {
    const { email } = req.body;

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
