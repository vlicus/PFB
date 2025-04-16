// Importamos los modelos.
import insertVoteModel from "../../models/users/insertVoteModel.js";
import checIfRentalHistoryExistsModel from "../../models/rent_history/checIfRentalHistoryExistsModel.js";

// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import voteUserSchema from "../../schemas/users/voteUserSchema.js";

// Importamos los errores.
import generateErrorUtil from "../../utils/generateErrorUtil.js";

// Función controladora final que permite votar un usuario.
const voteUserController = async (req, res, next) => {
  try {
    const { userId, rentHistoryId } = req.params;
    const { rating, comment } = req.body;

    // Comprobar si existe el rentHistoryId
    await checIfRentalHistoryExistsModel(rentHistoryId);
    if (userId === req.user.id) {
      generateErrorUtil("No te puedes votar a ti mismo", 500);
    }

    // Validamos el body con Joi.
    await validateSchemaUtil(voteUserSchema, req.body);

    // Insertamos el voto y obtenemos la nueva media.
    const newVotesAvg = await insertVoteModel(
      rating,
      userId,
      req.user.id,
      comment,
      rentHistoryId
    );

    res.send({
      status: "ok",
      data: {
        newVotesAvg,
        comment,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default voteUserController;
