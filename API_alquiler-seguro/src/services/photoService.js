// Importamos las dependencias.
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { randomUUID as uuid } from "crypto";

// Importamos los errores.
import generateErrorUtil from "../utils/generateErrorUtil.js";

// Importamos las variables de entorno necesarias.
import { UPLOADS_DIR } from "../../env.js";

export const savePhotoService = async (img, width, type, name) => {
  try {
    // Generamos un nombre único para la imagen para evitar que haya dos imágenes con el
    // mismo nombre.
    let imgName = `${name}.jpg`;

    // Ruta absoluta a la imagen.
    let imgPath;
    let uploadsDir;
    if (type === "rent") {
      // Ruta absoluta al directorio de subida de archivos.
      imgName = `${uuid()}.jpg`;
      uploadsDir = path.resolve(UPLOADS_DIR + "/" + type + "/" + name);
    } else {
      uploadsDir = path.resolve(UPLOADS_DIR + "/" + type);
    }
    imgPath = path.join(uploadsDir, imgName);
    // Creamos la carpeta uploads si no existe con la ayuda del método "access".
    try {
      await fs.access(uploadsDir);
    } catch {
      // Si el método anterior lanza un error quiere decir que el directorio no existe.
      // En ese caso entraríamos en el catch y lo crearíamos.
      await fs.mkdir(uploadsDir, { recursive: true });
    }

    // Creamos un objeto de tipo Sharp con la imagen recibida.
    const sharpImg = sharp(img.data);

    // Redimensionamos la imagen. El parámetro "width" representa un ancho en píxeles.
    sharpImg.resize(width);

    // Guardamos la imagen en la carpeta de subida de archivos.

    await sharpImg.toFile(imgPath);

    // Retornamos el nombre con el que hemos guardado la imagen.
    return imgName;
  } catch (err) {
    console.log(err);
    generateErrorUtil("Error al guardar el archivo en el disco", 500);
  }
};

export const deletePhotoService = async (imgName, type, name) => {
  try {
    let imgPath = "";
    if (type === "avatar") {
      // Ruta absoluta al directorio de subida de archivos.
      imgPath = path.resolve(UPLOADS_DIR + "/" + type + "/" + imgName);
    }

    if (type === "rent") {
      // Ruta absoluta al directorio de subida de archivos.
      imgPath = path.resolve(
        UPLOADS_DIR + "/" + type + "/" + name + "/" + imgName
      );
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
    generateErrorUtil("Error al eliminar el archivo del disco", 409);
  }
};
