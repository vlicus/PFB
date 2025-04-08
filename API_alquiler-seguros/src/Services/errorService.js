export const credencialesInvalidasError = () => {
  throw {
    httpStatus: 401, // Unauthorized
    code: "INVALID_CREDENTIALS",
    message: "Credenciales inválidas",
  };
};

export const tokenInvalidoError = () => {
  throw {
    httpStatus: 401, // Unauthorized
    code: "INVALID_TOKEN",
    message: "Token inválido",
  };
};

export const noAutenticadoError = () => {
  throw {
    httpStatus: 401, // Unauthorized
    code: "NOT_AUTHENTICATED",
    message: `Debes enviar un token en el header 'authorization'`,
  };
};
