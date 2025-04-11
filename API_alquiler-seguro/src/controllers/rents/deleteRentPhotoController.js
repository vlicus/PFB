// Importamos los modelos.
import selectRentByIdModel from "../../models/rents/selectRentByIdModel.js";
import deletePhotoModel from "../../models/rents/deletePhotoModel.js";

// Importamos los servicios.
import { deletePhotoService } from "../../services/photoService.js";

// Importamos los errores.
import { notFoundError } from "../../services/errorService.js";

// Función controladora final que elimina una foto del alquiler.
const deleteRentPhotoController = async (req, res, next) => {
  try {
    // Obtenemos el id del alquiler y el id de la foto de los path params.
    const { entryId, photoId } = req.params;

    // Obtenemos los detalles del alquiler.
    const entry = await selectRentByIdModel(entryId);

    // Variable que almacenará la foto que queremos eliminar.
    const photo = entry.photos.find((photo) => photo.id === photoId);

    // Si la foto no existe en el array de fotos de la entrada lanzamos un error.
    if (!photo) {
      notFoundError("foto");
    }

    // Borramos la foto de la carpeta de subida de archivos.
    await deletePhotoService(photo.name);

    // Borramos la foto de la base de datos.
    await deletePhotoModel(photoId);

    res.send({
      status: "ok",
      message: "Foto eliminada",
    });
  } catch (err) {
    next(err);
  }
};

export default deleteRentPhotoController;
