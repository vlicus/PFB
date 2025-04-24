import validationModel from "../../models/users/validationModel.js";

const validationController = async (req, res, next) => {
  try {
    const { regcode } = req.params;

    console.log(req.params);
    await validationModel(regcode);

    res.send({
      status: "ok",
      message: "Usuario validado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export default validationController;
