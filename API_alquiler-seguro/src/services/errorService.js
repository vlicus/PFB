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

export const emailAlreadyRegisteredError = () => {
  throw {
    httpStatus: 409, // Conflict
    code: "EMAIL_ALREADY_REGISTERED",
    message: "El email ya está registrado",
  };
};

export const userAlreadyRegisteredError = () => {
  throw {
    httpStatus: 409, // Conflict
    code: "USER_ALREADY_REGISTERED",
    message: "El nombre de usuario ya está registrado",
  };
};

export const unauthorizedUserError = () => {
  throw {
    httpStatus: 409, // Conflict
    code: "UNAUTHORIZED",
    message: "El usuario no está autorizado para hacer esta operación",
  };
};

export const pendingActivationError = () => {
  throw {
    httpStatus: 403, // Forbidden
    code: "PENDING_ACTIVATION",
    message:
      "Usuario pendiente de activar. Por favor, verifica tu cuenta antes de continuar.",
  };
};

export const cannotVoteYourselfError = () => {
  throw {
    httpStatus: 403, // Forbidden
    code: "CANNOT_VOTE_OWN_ENTRY",
    message: "No puedes votar tu propio perfil",
  };
};

export const notFoundError = (resource) => {
  throw {
    httpStatus: 404, // Not Found
    code: "RESOURCE_NOT_FOUND",
    message: `El recurso requerido '${resource}' no existe`,
  };
};

export const photoLimitReachedError = () => {
  throw {
    httpStatus: 409, // Conflict
    code: "PHOTO_LIMIT_REACHED",
    message: "Se ha alcanzado el límite de veinte fotos en la entrada",
  };
};

export const saveFileError = () => {
  throw {
    httpStatus: 500, // Internal Server Error
    code: "FILE_SAVE_FAILED",
    message: "Error al guardar el archivo en el disco",
  };
};

export const deleteFileError = () => {
  throw {
    httpStatus: 409, // Conflict
    code: "FILE_DELETED_FAILED",
    message: "Error al eliminar el archivo del disco",
  };
};

export const invalidCredentialsError = () => {
  throw {
    httpStatus: 401, // Unauthorized
    code: "INVALID_CREDENTIALS",
    message: "Credenciales inválidas",
  };
};

export const cannotRequestOwnRentError = () => {
  throw {
    httpStatus: 403, // Forbidden
    code: "CANNOT_REQUEST_OWN_RENT",
    message: "No puedes solicitar tu propio alquiler",
  };
};

export const voteAlreadyExistsError = () => {
  throw {
    httpStatus: 409, // Conflict
    code: "VOTE_ALREADY_EXISTS",
    message: "No se puede votar más de una vez la misma entrada",
  };
};

export const cannotAcceptRequestRentError = () => {
  throw {
    httpStatus: 403, // Forbidden
    code: "CANNOT_ACCEPT_REQUEST_RENT",
    message: "No puedes aceptar tu propio alquiler",
  };
};

export const onlyCanAcceptPendingRequestError = () => {
  throw {
    httpStatus: 409,
    code: "ONLY_ACCEPT_PENDING_REQUEST",
    message: "Solo se pueden aceptar o rechazar solicitudes pendientes.",
  };
};

export const notValidStatusRequestError = () => {
  throw {
    httpStatus: 409,
    code: "NOT_VALID_STATUS_REQUEST",
    message:
      "Acción no válida. Debe ser 'APPROVED' ,'REJECTED','ACTIVE' o 'CANCELLED'.",
  };
};

export const passwordsNotMatchError = () => {
  throw {
    httpStatus: 409, // Conflict
    code: "PASSWORDS_NOT_MATCH",
    message: "Tu contraseña no coincide con la guardada en la base de datos",
  };
};
