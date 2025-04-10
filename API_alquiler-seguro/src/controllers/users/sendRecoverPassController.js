import selectUserByEmailModel from "../../models/users/selectUserByEmailModel.js";
import sendRecoverPassModel from "../../models/users/sendRecoverPassModel.js";
import { notFoundError } from "../../services/errorService.js";
import randomstring from "randomstring";

// Función controladora que envía un correo de recuperación de contraseña.
const sendRecoverPassController = async (req, res, next) => {
  try {
    // Obtenemos el email de la persona que quiere recuperar su contraseña.
    const { email } = req.body;

    // Pendiente validación con Joi.

    // Comprobamos si existe algún usuario con el email proporcionado.
    const user = await selectUserByEmailModel(email);

    // Si no existe un usuario con ese email lanzamos un error.
    if (!user) {
      notFoundError("usuario");
    }
    // Generamos el código de recuperación de contraseña.
    const recoverPassCode = randomstring.generate(10);
    // Insertamos el código de recuperación de contraseña.
    await sendRecoverPassModel(email, recoverPassCode);

    res.send({
      status: "ok",
      message: "Correo de recuperación de contraseña enviado",
    });
  } catch (err) {
    next(err);
  }
};

export default sendRecoverPassController;
