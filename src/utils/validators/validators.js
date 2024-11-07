const { ValidationError, AuthenticationError } = require("../../errors/errors");
const bcrypt = require("bcrypt");

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
module.exports = { validateDataRequest, generateHashPassword, verifyPassword };
