import newRentModel from "../../models/rents/newRentalModel.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";
import Joi from "joi";

// Validación con Joi
const rentSchema = Joi.object({
  address: Joi.string().min(5).max(255).required(),
  price: Joi.number().positive().required(),
  num_rooms: Joi.number().integer().min(1).required(),
  availability_date: Joi.date().iso().required(),
  description: Joi.string().min(10).max(1000).required(),
});

const newRentalController = async (req, res) => {
  try {
    const { error, value } = rentSchema.validate(req.body);
    if (error) {
      throw generateErrorUtil(`Error de validación: ${error.message}`, 400);
    }

    const { address, price, num_rooms, availability_date, description } = value;
    const property_owner_id = req.user.id;

    const rent_id = await newRentModel(
      property_owner_id,
      address,
      price,
      num_rooms,
      availability_date,
      description
    );

    if (!rent_id) {
      throw generateErrorUtil("Error al crear la propiedad en alquiler", 500);
    }

    res.send({
      status: "ok",
      data: {
        rent_id,
        property_owner_id,
        address,
        price,
        num_rooms,
        availability_date,
        description,
        is_available: true,
        is_approved: false,
      },
    });
  } catch (error) {
    res.status(error.status || 500).send({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};

export default newRentalController;
