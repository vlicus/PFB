import getUserDetailsModel from "../../models/users/getUserDetailsModel.js";

const userDetailsController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await getUserDetailsModel(userId);

    res.send({
      status: "ok",
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};

export default userDetailsController;
