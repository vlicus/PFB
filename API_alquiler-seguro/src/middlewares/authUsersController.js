import jwt from "jsonwebtoken";
import generateErrorUtil from "../utils/generateErrorUtil.js";

const authUserController = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      generateErrorUtil(
        "Debes enviar un token en el header 'authorization'",
        401
      );
    }

    let [protocol, token] = authorization.split(" ");

    if (protocol !== "Bearer" || !token) {
      generateErrorUtil("El token es inválido", 401);
    }
    console.log(authorization);
    console.log(token);

    let tokenInfo;
    try {
      tokenInfo = jwt.verify(token, process.env.SECRET);
    } catch (err) {
      generateErrorUtil("Credenciales inválidas", 401);
    }

    req.user = tokenInfo;

    next();
  } catch (err) {
    next(err);
  }
};

export default authUserController;
