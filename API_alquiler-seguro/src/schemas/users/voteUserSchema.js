// Importamos joi.
import joi from "joi";

// Importamos los mensajes de error personalizados.
import joiErrorMessages from "../joiErrorMessages.js";

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const voteUserSchema = joi.object({
  rating: joi.number().min(1).max(5).required().messages(joiErrorMessages),
  comment: joi
    .string()
    .pattern(/^[\s\S]{3,65000}$/)
    .required()
    .messages(joiErrorMessages),
});

export default voteUserSchema;
