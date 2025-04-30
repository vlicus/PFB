import getUserRatingsModel from "../../models/users/getUserRatingsModel.js";

const getUserRatingsController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const ratings = await getUserRatingsModel(userId);

    res.status(200).json({ status: "ok", data: ratings });
  } catch (error) {
    next(error);
  }
};

export default getUserRatingsController;
