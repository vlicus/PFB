import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateErrorUtil from "../../utils/generateErrorUtil.js";
import selectUserByEmailModel from "../../models/users/selectUserByEmailModel.js";
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";
import loginUserSchema from "../../schemas/users/loginUserSchema.js";

const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    await validateSchemaUtil(loginUserSchema, req.body);

    const user = await selectUserByEmailModel(email, password);

    let validPass;
    if (user) {
      validPass = await bcrypt.compare(password, user.password);
    }
    if (!user.active) {
      generateErrorUtil(
        "Usuario pendiente de activar. Activa tu usuario accediendo al email de verificación que has recibido en tu correo",
        403
      );
    }

    if (!user || !validPass) {
      generateErrorUtil("Los datos no coinciden", 400);
    }
    const tokenInfo = {
      id: user.id,
      role: user.role,
    };
    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "7d",
    });
    res.send({
      status: "ok",
      data: {
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default loginUserController;
