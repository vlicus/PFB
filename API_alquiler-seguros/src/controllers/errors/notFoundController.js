import { notFoundError } from "../../Services/errorService";

const notFound = (req, res, next) => {
  next(notFoundError("ruta"));
};

export default notFound;
