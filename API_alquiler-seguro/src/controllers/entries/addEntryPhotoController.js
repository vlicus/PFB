// Importamos los modelos.
import insertPhotoModel from "../../models/entries/insertPhotoModel.js";
import selectRentByIdModel from "../../models/entries/selectRentByIdModel";

// Importamos los servicios.
import { savePhotoService } from "../../services/photoService.js";

// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import addEntryPhotoSchema from "../../schemas/entries/addEntryPhotoSchema.js";

// Importamos los errores.
import { photoLimitReachedError } from "../../services/errorService.js";

// Función controladora final que agrega una foto a una entrada.
const addEntryPhotoController = async (req, res, next) => {
  try {
    // Obtenemos el id de al entrada de los path params.
    const { entryId } = req.params;

    // Validamos el body con Joi. Dado que "files" podría no existir enviamos un objeto vacío
    // si se da el caso.
    await validateSchemaUtil(addEntryPhotoSchema, req.files || {});

    // Obtenemos la información de la entrada para comprobar si somos los propietarios.
    const entry = await selectRentByIdModel(entryId);

    // Si la entrada tiene más de tres fotos lanzamos un error.
    if (entry.photos.length > 2) {
      photoLimitReachedError();
    }

    // Guardamos la foto en la carpeta de subida de archivos, redimensionamos a un ancho de
    // 500px y obtenemos su nombre.
    const photoName = await savePhotoService(req.files.photo, 500);

    // Guardamos la foto en la base de datos y obtenemos el id de la misma.
    const photoId = await insertPhotoModel(photoName, entryId);

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

export default addEntryPhotoController;
