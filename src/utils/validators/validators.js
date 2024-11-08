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

module.exports = {
  validateDataRequest,
  generateHashPassword,
  verifyPassword,
  validateClubDataRequest,
};
