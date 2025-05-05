// Importamos joi.
import joi from "joi";

// Importamos los mensajes de error personalizados.
import joiErrorMessages from "../joiErrorMessages.js";

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const updateRentSchema = joi.object({
  address: joi.string().messages(joiErrorMessages),
  city: joi.string().messages(joiErrorMessages),
  description: joi.string().min(1).max(65535).messages(joiErrorMessages),
  price: joi.number().positive().messages(joiErrorMessages),
  num_rooms: joi.number().positive().messages(joiErrorMessages),
});

export default updateRentSchema;
