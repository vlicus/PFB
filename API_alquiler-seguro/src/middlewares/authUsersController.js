import jwt from "jsonwebtoken";
import {
  credencialesInvalidasError,
  tokenInvalidoError,
  noAutenticadoError,
} from "../services/errorService.js";

const authUserController = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      noAutenticadoError();
    }

    let [protocol, token] = authorization.split(" ");

    if (protocol !== "Bearer" || !token) {
      tokenInvalidoError();
    }
    console.log(authorization);
    console.log(token);

    let tokenInfo;
    try {
      tokenInfo = jwt.verify(token, process.env.SECRET);
    } catch (err) {
      console.log(err);
      credencialesInvalidasError();
    }

    req.user = tokenInfo;

    next();
  } catch (err) {
    next(err);
  }
};

export default authUserController;
