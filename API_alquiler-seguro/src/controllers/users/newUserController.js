import randomstring from "randomstring";

import insertUserModel from "../../models/users/insertUserModel.js";

// TBD, Esquema de Joi (Extra)
/* import validateSchemaUtil from "../../utils/validateSchemaUtil.js"
 */

// TBD, Importamos el esquema
/* import newUserSchema from "../../schemas/users/newUserSchema.js" */

// Función controladora final que crea un nuevo usuario.
const newUserController = async (req, res, next) => {
  try {
    // Obtenemos los datos necesarios del body
    const { username, email, password } = req.body;

    // Validamos el body con Joi
    await validateSchemaUtil(newUserSchema, req.body);

    // Creamos el código de registro.
    const registration_code = randomstring.generate(30);

    // Insertamos el usuario
    await insertUserModel(username, email, password, registration_code);

    res.send({
      status: "ok",
      message: `
            Usuario creado.
            `,
    });
  } catch (error) {
    next(error);
  }
};

export default newUserController;
