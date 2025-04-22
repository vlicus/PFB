import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateErrorUtil from "../../utils/generateErrorUtil.js";
import selectUserByEmailModel from "../../models/users/selectUserByEmailModel.js";
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";
import loginUserSchema from "../../schemas/users/loginUserSchema.js";

const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validamos el esquema
    await validateSchemaUtil(loginUserSchema, req.body);

    // Buscamos el usuario por email
    const user = await selectUserByEmailModel(email);

    // Verificamos si existe el usuario
    if (!user) {
      throw generateErrorUtil("No existe ninguna cuenta con ese email", 404);
    }

    // Verificamos si el usuario está activo
    if (!user.active) {
      throw generateErrorUtil(
        "Usuario pendiente de activar. Activa tu usuario accediendo al email de verificación que has recibido.",
        403
      );
    }

    // Comprobamos la contraseña
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      throw generateErrorUtil("Contraseña incorrecta", 400);
    }

    // Creamos el token
    const tokenInfo = {
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "7d",
    });

    res.send({
      status: "ok",
      data: { token },
    });
  } catch (err) {
    next(err);
  }
};

export default loginUserController;
