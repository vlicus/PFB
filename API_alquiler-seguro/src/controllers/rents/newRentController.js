import insertPhotoModel from "../../models/rents/insertPhotoModel.js";
import insertRentModel from "../../models/rents/insertRentModel.js";
import selectRentByIdModel from "../../models/rents/selectRentByIdModel.js";
import selectUserByIdModel from "../../models/users/selectUserByIdModel.js";
import addRentPhotoSchema from "../../schemas/rents/addRentPhotoSchema.js";
import { savePhotoService } from "../../services/photoService.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

const newRentController = async (req, res, next) => {
  try {
    const { address, city, price, num_rooms, description } = req.body;
    const userId = req.user.id;
    const property_owner_id = userId;

    if (!address || !city || !price || !num_rooms || !description) {
      generateErrorUtil(
        "Faltan campos obligatorios: address, price, numero de habitaciones, descripción",
        500
      );
    }
    const rentId = await insertRentModel(
      property_owner_id,
      address,
      city,
      price,
      num_rooms,
      description
    );

    // Validamos el body con Joi. Dado que "files" podría no existir enviamos un objeto vacío
    // si se da el caso.
    //await validateSchemaUtil(addRentPhotoSchema, req.files || {});

    // Obtenemos la información de la entrada para comprobar si somos los propietarios.
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
      message: `Alquiler creado con id ${rentId}`,
      data: {
        rent: {
          id: rentId,
          address,
          city,
          price,
          userId: userId,
          photos,
          createdAt: new Date(),
        },
      },
    });
  } catch (error) {
    generateErrorUtil(error);
  }
};

export default newRentController;
