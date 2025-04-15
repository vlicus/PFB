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
    const { rentId, photoId: photoIdStr } = req.params;

    // req.params photoId siempre va a enviar un string desde POSTMAN, nos tenemos que asegurar que, al tener en la base de datos un número como id de la imagen (en AUTOINCREMENT), transformamos el string req.params.photoId a un número antes de utilizarlo. Aunque se haga console.log(photoId) y muestre un número sin "", lo interpreta como un string igualmente
    const photoId = parseInt(photoIdStr, 10);

    // Obtenemos los detalles del alquiler.
    const rent = await selectRentByIdModel(rentId);
    // Variable que almacenará la foto que queremos eliminar.
    const photo = rent.photos.find((photo) => photo.id === photoId);
    console.log(photo);
    // Si la foto no existe en el array de fotos del alquiler lanzamos un error.
    if (!photo) {
      notFoundError("foto");
    }

    // Borramos la foto de la carpeta de subida de archivos.
    await deletePhotoService(photo.name);

    // Borramos la foto de la base de datos.
    await deletePhotoModel(photoId);

    res.send({
      status: "ok",
      message: `Foto : ${photo.name} eliminada correctamente`,
    });
  } catch (err) {
    next(err);
  }
};

export default deleteRentPhotoController;
