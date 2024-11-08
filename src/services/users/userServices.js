require("dotenv").config();
const prisma = require("../../../prisma/prismaClient");
const {
  NotFoundError,
  AuthorizationError,
  ValidationError,
} = require("../../errors/errors");
const {
  generateHashPassword,
  verifyPassword,
} = require("../../utils/validators/validators");

const jwt = require("jsonwebtoken");

const createUser = async (data) => {
  const user = await findUserByEmail(data.email);
  if (user) {
    throw new ValidationError("E-mail ou username já cadastrados");
  }
  const hashedPassword = await generateHashPassword(data.password);
  const userData = await prisma.user.create({
    data: {
      username: data.username,
      password: hashedPassword,
      email: data.email,
    },
  });
  return userData;
};

const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
};

const userAuthenticate = async (data) => {
  const user = await findUserByEmail(data.email);
  if (!user) {
    throw new NotFoundError("E-mail ou senha inválidos");
  }
  await verifyPassword(data.password, user.password);
  return user;
};

const updateUserById = async (data, userId) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: data,
  });

  return user;
};

module.exports = {
  createUser,
  userAuthenticate,
  findUserByEmail,
  updateUserById,
};
