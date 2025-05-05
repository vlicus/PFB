import updateRentSchema from "../../schemas/rents/updateRentSchema.js";
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos los servicios.

import updateRentModel from "../../models/rents/updateRentModel.js";
import { savePhotoService } from "../../services/photoService.js";
import insertPhotoModel from "../../models/rents/insertPhotoModel.js";
import selectUserByIdModel from "../../models/users/selectUserByIdModel.js";
import selectRentByIdModel from "../../models/rents/selectRentByIdModel.js";

const updateRentController = async (req, res, next) => {
  try {
    const { rentId } = req.params;

    // Validamos el body con Joi.
    await validateSchemaUtil(updateRentSchema, req.body);

    // Actualizamos los datos de texto del usuario
    await updateRentModel(rentId, req.body);
    const rent = await selectRentByIdModel(rentId);
    const user = await selectUserByIdModel(rent.property_owner_id);

    const photos = [];
    const type = "rent";

    if (req.files) {
      if (!Array.isArray(req.files.photos)) {
        req.files.photos = [req.files.photos];
      }
      for (const photo of req.files.photos.slice(0, 20)) {
        const photoName = await savePhotoService(
          photo,
          500,
          type,
          user.username
        );

        const photoId = await insertPhotoModel(photoName, rentId);

        photos.push({
          id: photoId,
          rent_id: rentId,
          name: photoName,
        });
      }
    }

    res.send({
      status: "ok",
      message: "Alquiler actualizado",
    });
  } catch (err) {
    next(err);
  }
};

export default updateRentController;
