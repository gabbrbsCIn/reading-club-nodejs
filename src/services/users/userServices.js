require("dotenv").config();
const prisma = require("../../../prisma/prismaClient");
const { NotFoundError } = require("../../errors/errors");
const {
  generateHashPassword,
  verifyPassword,
} = require("../../utils/validators/validators");

const jwt = require("jsonwebtoken");

const createUser = async (data) => {
  const hashedPassword = await generateHashPassword(data.password);
  const user = await prisma.user.create({
    data: {
      username: data.username,
      password: hashedPassword,
      email: data.email,
    },
  });
  return user.email;
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

const generateJWTToken = (user) => {
  const payload = { id: user.id };
  const secretKey = process.env.JWT_SECRET_KEY;
  console.log(process.env.JWT_EXPIRES_IN);
  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN,
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};
module.exports = {
  createUser,
  userAuthenticate,
  findUserByEmail,
  generateJWTToken,
};
