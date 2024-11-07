const prisma = require("../../../prisma/prismaClient");
const { generateHashPassword } = require("../../utils/validators/validators");

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
module.exports = { createUser };
