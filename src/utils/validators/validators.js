const error = require("../../errors/errors");
const bcrypt = require("bcrypt")

const validateDataRequest = (userData) => {
  if (!userData.username || !userData.email || !userData.password) {
    throw new error.ValidationError("Dados não preenchidos ou incompletos");
  }
  return true;
};

const generateHashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

module.exports = { validateDataRequest, generateHashPassword };
