// Importamos las dependencias.
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { randomUUID as uuid } from "crypto";

// Importamos los errores.
import { saveFileError, deleteFileError } from "./errorService.js";

// Importamos las variables de entorno necesarias.
import { UPLOADS_DIR, UPLOADS_RENT, UPLOADS_AVATAR } from "../../env.js";

export const savePhotoService = async (img, width, type) => {
  try {
    const uploadsDir = "";
    if (type === "avatar") {
      // Ruta absoluta al directorio de subida de archivos.
      uploadsDir = path.resolve(UPLOADS_AVATAR);
    }

    if (type === "rent") {
      // Ruta absoluta al directorio de subida de archivos.
      uploadsDir = path.resolve(UPLOADS_RENT);
    }

    // Creamos la carpeta uploads si no existe con la ayuda del método "access".
    try {
      await fs.access(uploadsDir);
    } catch {
      // Si el método anterior lanza un error quiere decir que el directorio no existe.
      // En ese caso entraríamos en el catch y lo crearíamos.
      await fs.mkdir(uploadsDir);
    }

    // Creamos un objeto de tipo Sharp con la imagen recibida.
    const sharpImg = sharp(img.data);

    // Redimensionamos la imagen. El parámetro "width" representa un ancho en píxeles.
    sharpImg.resize(width);

    // Generamos un nombre único para la imagen para evitar que haya dos imágenes con el
    // mismo nombre.
    const imgName = `${uuid()}.jpg`;

    // Ruta absoluta a la imagen.
    const imgPath = path.join(uploadsDir, imgName);

    // Guardamos la imagen en la carpeta de subida de archivos.
    await sharpImg.toFile(imgPath);

    // Retornamos el nombre con el que hemos guardado la imagen.
    return imgName;
  } catch (err) {
    console.error(err);
    saveFileError();
  }
};

export const deletePhotoService = async (imgName, type) => {
  try {
    const imgPath = "";
    if (type === "avatar") {
      // Ruta absoluta al directorio de subida de archivos.
      imgPath = path.resolve(UPLOADS_AVATAR, imgName);
    }

    if (type === "rent") {
      // Ruta absoluta al directorio de subida de archivos.
      imgPath = path.resolve(UPLOADS_RENT, imgName);
    }

    // Comprobamos si la imagen existe con la ayuda del método "access".
    try {
      await fs.access(imgPath);
    } catch {
      // Si el método anterior lanza un error quiere decir que la imagen no existe.
      // En ese caso finalizamos la función.
      return;
    }

    // Eliminamos el archivo de la carpeta de subida de archivos.
    await fs.unlink(imgPath);
  } catch (err) {
    console.error(err);
    deleteFileError();
  }
};
