import getUserWithHistoryModel from "../../models/users/getUserWithHistoryModel.js";

const userHistoryAndDetailsController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await getUserWithHistoryModel(userId);

    res.send({
      status: "ok",
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};

export default userHistoryAndDetailsController;
