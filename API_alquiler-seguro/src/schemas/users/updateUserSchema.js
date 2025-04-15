// Importamos joi.
import joi from "joi";

// Importamos los mensajes de error personalizados.
import joiErrorMessages from "../joiErrorMessages.js";

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const updateUserSchema = joi.object({
  username: joi.string().messages(joiErrorMessages),
  bio: joi.string().min(1).max(65535).messages(joiErrorMessages),
  phone_number: joi.string().min(9).max(20).messages(joiErrorMessages),

  first_name: joi.string().max(50).allow("").messages(joiErrorMessages),

  last_name: joi.string().max(50).allow("").messages(joiErrorMessages),
});

export default updateUserSchema;
