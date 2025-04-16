import editUserAvatarSchema from "../../schemas/users/editUserAvatarSchema.js";
import updateUserSchema from "../../schemas/users/updateUserSchema.js";
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";
// Importamos los servicios.
import {
  savePhotoService,
  deletePhotoService,
} from "../../services/photoService.js";
import selectUserByIdModel from "../../models/users/selectUserByIdModel.js";
import updateUserAvatarModel from "../../models/users/updateUserAvatarModel.js";
import updateUserModel from "../../models/users/updateUserModel.js";

const updateUserController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await selectUserByIdModel(userId);

    const type = "avatar";

    // Validamos el body con Joi.
    await validateSchemaUtil(updateUserSchema, req.body);

    // Validamos el body con Joi. Si "files" no existe enviamos un objeto vacío.
    await validateSchemaUtil(editUserAvatarSchema, req.files || {});

    // Si el usuario tiene un avatar previo lo eliminamos.
    if (user.avatar) {
      await deletePhotoService(user.avatar, type);
    }
    // Guardamos el avatar en la carpeta de subida de archivos. Redimensionamos a un ancho
    // de 100 píxeles.
    if (req.files.avatar) {
      const avatarName = await savePhotoService(req.files?.avatar, 100);
      // Actualizamos los datos del usuario con el nombre de avatar que hemos obtenido.
      await updateUserAvatarModel(avatarName, userId);
    }

    // Actualizamos los datos de texto del usuario
    await updateUserModel(userId, req.body);

    res.send({
      status: "ok",
      message: "Usuario actualizado",
    });
  } catch (err) {
    next(err);
  }
};

export default updateUserController;
