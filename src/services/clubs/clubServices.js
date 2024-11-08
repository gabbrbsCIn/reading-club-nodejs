const prisma = require("../../../prisma/prismaClient");
const { NotFoundError, AuthorizationError } = require("../../errors/errors");

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

const findUserClubById = async (userId, clubId) => {
  const join = await prisma.userClub.findUnique({
    where: {
      userId_clubId: {
        userId: userId,
        clubId: clubId,
      },
    },
  });

  if (!join) {
    throw new AuthorizationError("Você não é cadastrado nesse clube");
  }
};

const updateClub = async (clubData, clubId) => {
  const club = await prisma.club.update({
    where: {
      id: clubId,
    },
    data: clubData,
  });

  return club;
};

const deleteClubById = async (clubId) => {
  const club = await prisma.club.delete({
    where: {
      id: clubId,
    },
  });

  return club;
};

module.exports = {
  createClub,
  findClubById,
  JoinAUserToClub,
  findUserClubById,
  updateClub,
  deleteClubById,
};
