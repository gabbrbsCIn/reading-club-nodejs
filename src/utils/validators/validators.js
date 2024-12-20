require("dotenv").config();

const {
  ValidationError,
  AuthenticationError,
  AuthorizationError,
} = require("../../errors/errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validateDataRequest = (userData, method) => {
  if (
    method == "register" &&
    (!userData.username || !userData.email || !userData.password)
  ) {
    throw new ValidationError("Dados não preenchidos ou incompletos");
  }
  if (method == "login" && (!userData.email || !userData.password)) {
    throw new ValidationError("Dados não preenchidos ou incompletos");
  }
  if (method == "update" && (!userData.email || !userData.username)) {
    throw new ValidationError("Dados não preenchidos ou incompletos");
  }
  return true;
};

const generateHashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const verifyPassword = async (inputPassword, rightPassword) => {
  const isPasswordValid = await bcrypt.compare(inputPassword, rightPassword);
  if (!isPasswordValid) {
    throw new AuthenticationError("E-mail ou senha inválidos");
  }
  return isPasswordValid;
};

const validateClubDataRequest = (data) => {
  if (!data.name) {
    throw new ValidationError("Nome não inserido");
  }
  if (!data.description) {
    return { name: data.name };
  }

  return { name: data.name, description: data.description };
};

const validateListDataRequest = (data) => {
  if (!data.name) {
    throw new ValidationError("Dados não preenchidos ou incompletos");
  }
  return true;
};

const validateBookDataRequest = (data) => {
  if (!data.title || !data.author) {
    throw new ValidationError("Dados não preenchidos ou incompletos");
  }
  return true;
};

const validateStatusDataRequest = (data) => {
  if (!data.status) {
    throw new ValidationError("Dados não preenchidos ou incompletos");
  }

  if (data.status !== "completed" && data.status !== "reading" && data.status !== "to-read") {
    throw new ValidationError("Status inválido. Deve ser 'completed', 'reading' ou 'to-read'");
  }
  return true;
}

const validateReviewDataRequest = (data) => {
  if (data.score === undefined || data.content === undefined) {
    throw new ValidationError("Dados não preenchidos ou incompletos");
  }
  if (data.score < 0 || data.score > 5) {
    throw new ValidationError("Nota deve ser entre 0 e 5");
  }
  return true;
};

module.exports = {
  validateDataRequest,
  generateHashPassword,
  verifyPassword,
  validateClubDataRequest,
  validateListDataRequest,
  validateBookDataRequest,
  validateStatusDataRequest,
  validateReviewDataRequest,
};
