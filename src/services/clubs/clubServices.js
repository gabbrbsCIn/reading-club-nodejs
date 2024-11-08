const prisma = require("../../../prisma/prismaClient");
const { NotFoundError } = require("../../errors/errors");

const createClub = async (data) => {
  const club = await prisma.club.create({ data: data });
  return club;
};

const findClubById = async (id) => {
  const club = await prisma.club.findFirst({
    where: {
      id: id,
    },
  });

  if (!club) {
    throw new NotFoundError("Id do clube inválido");
  }
};

const JoinAUserToClub = async (userId, clubId) => {
  const join = await prisma.userClub.create({
    data: {
      userId: userId,
      clubId: clubId,
    },
  });

  return join;

};

module.exports = { createClub, findClubById, JoinAUserToClub };
