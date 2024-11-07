const {
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
} = require("../../errors/errors");

const sendErrorResponse = (res, error) => {
  let statusCode = 500;
  let message = "Ocorreu um erro inesperado";

  if (error instanceof ValidationError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof AuthenticationError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof AuthorizationError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof NotFoundError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error.statusCode) {
    statusCode = error.statusCode;
    message = error;
  }

  res.status(statusCode).json({
    message: message,
    status: statusCode,
  });
};

const sendSuccessResponse = (res, data) => {
  res.status(200).json({ success: data });
};

module.exports = { sendErrorResponse, sendSuccessResponse };
