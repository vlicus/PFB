// Importamos joi.
import joi from "joi";

// Importamos los mensajes de error personalizados.
import joiErrorMessages from "../joiErrorMessages.js";

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const newUserSchema = joi.object({
  username: joi.string().required().messages(joiErrorMessages),
  email: joi.string().email().required().messages(joiErrorMessages),
  password: joi
    .string()
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
    )
    .required()
    .messages(joiErrorMessages),
  bio: joi.string().min(1).max(65535).messages(joiErrorMessages).required(),
  /* passwordRepeat: joi.string(), */
  phone_number: joi
    .string()
    .min(9)
    .max(20)
    .messages(joiErrorMessages)
    .required(),
  //Otra opción para que el back no se queje
});
//Otra opción para que no se queje
/* .unknown(); */
export default newUserSchema;
