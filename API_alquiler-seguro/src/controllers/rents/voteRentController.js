// Importamos los modelos.
import selectRentByIdModel from "../../models/rents/selectRentByIdModel.js";
import insertVoteModel from "../../models/rents/insertVoteModel.js";

// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import voteEntrySchema from "../../schemas/rents/voteEntrySchema.js";

// Importamos los errores.
import { cannotVoteOwnRentError } from "../../services/errorService.js";

// Función controladora final que permite votar un alquiler.
const voteRentController = async (req, res, next) => {
  try {
    const { recipient_id } = req.params;
    const { rating, comment } = req.body;

    // Validamos el body con Joi.
    await validateSchemaUtil(voteEntrySchema, req.body);

    // Obtenemos los detalles del alquiler.
    const rent = await selectRentByIdModel(recipient_id);

    // Si somos los dueños de la entrada lanzamos un error.
    if (rent.userId === req.user.id) {
      cannotVoteOwnRentError();
    }

    // Insertamos el voto y obtenemos la nueva media.
    const newVotesAvg = await insertVoteModel(
      rating,
      recipient_id,
      req.user.id
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

export default voteRentController;
