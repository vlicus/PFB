// Importamos los modelos.
import insertPhotoModel from "../../models/rents/insertPhotoModel.js";
import selectRentByIdModel from "../../models/rents/selectRentByIdModel.js";

// Importamos los servicios.
import { savePhotoService } from "../../services/photoService.js";

// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import addRentPhotoSchema from "../../schemas/rents/addRentPhotoSchema.js";

// Importamos los errores.
import generateErrorUtil from "../../utils/generateErrorUtil.js";

// Función controladora final que agrega una foto a una entrada.
const addRentPhotoController = async (req, res, next) => {
  try {
    // Obtenemos el id de al entrada de los path params.
    const { rentId } = req.params;

    // Validamos el body con Joi. Dado que "files" podría no existir enviamos un objeto vacío
    // si se da el caso.
    await validateSchemaUtil(addRentPhotoSchema, req.files || {});

    // Obtenemos la información de la entrada para comprobar si somos los propietarios.
    const rent = await selectRentByIdModel(rentId);

    // Si la entrada tiene más 20 fotos lanzamos un error.
    if (rent.photos.length === 20) {
      generateErrorUtil("Se ha superado el límite de fotos", 404);
    }

    // Guardamos la foto en la carpeta de subida de archivos, redimensionamos a un ancho de
    // 500px y obtenemos su nombre.
    const photoName = await savePhotoService(req.files.photo, 500);

    // Guardamos la foto en la base de datos y obtenemos el id de la misma.
    const photoId = await insertPhotoModel(photoName, rentId);

    res.send({
      status: "ok",
      data: {
        photo: {
          id: photoId,
          name: photoName,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export default addRentPhotoController;
