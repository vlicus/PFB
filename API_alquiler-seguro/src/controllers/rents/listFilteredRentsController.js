import selectFilteredRentsModel from "../../models/rents/selectFilteredRentsModel.js";

const listFilteredRentsController = async (req, res, next) => {
  try {
    const { address, maxPrice, minRooms } = req.query;

    const rents = await selectFilteredRentsModel({
      address,
      maxPrice,
      minRooms,
    });

    res.send({
      status: "ok",
      data: rents,
    });
  } catch (err) {
    next(err);
  }
};

export default listFilteredRentsController;
