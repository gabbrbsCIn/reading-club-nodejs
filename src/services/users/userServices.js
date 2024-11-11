require("dotenv").config();
const prisma = require("../../../prisma/prismaClient");
const {
  NotFoundError,
  AuthorizationError,
  ValidationError,
} = require("../../errors/errors");

const client = require("../../../redis/redisClient");
const { getTokenRemainingTime } = require("../../utils/token/token");
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

const deleteUserById = async (userId) => {
  const user = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return user;
};

const addTokenToBlacklist = async (token) => {
  const tokenRemainingTime = getTokenRemainingTime(token);
  await client.set(token, "revoked", "EXP", tokenRemainingTime);
  return token;
}
const checkTokenInBlackList = async (token) => {
  const isTokenInBlackList = await client.get(token);
  if (isTokenInBlackList) {
    throw new AuthorizationError("Token inválido");
  }
  return isTokenInBlackList;
};

module.exports = {
  createUser,
  userAuthenticate,
  findUserByEmail,
  updateUserById,
  deleteUserById,
  addTokenToBlacklist,
  checkTokenInBlackList
};
