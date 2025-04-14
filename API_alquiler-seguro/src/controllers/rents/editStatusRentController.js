import availableStatusRentModel from "../../models/rents/availableStatusRentModel.js";
import selectRentByIdModel from "../../models/rents/selectRentByIdModel.js";

import { unauthorizedUserError } from "../../services/errorService.js";

const editStatusRentController = async (req, res, next) => {
  try {
    // obtenemos los datos del alquiler para comprobar su status previo.
    const { rentId } = req.params;
    const { status } = req.body;
    const rent = await selectRentByIdModel(rentId);
    console.log(rent);
    if (rent.property_owner_id !== req.user.id) {
      unauthorizedUserError();
    }
    await availableStatusRentModel(status, rent.property_owner_id, rentId);
    res.send({
      status: "ok",
      message: "Status actualizado",
    });
  } catch (err) {
    next(err);
  }
};

export default editStatusRentController;
