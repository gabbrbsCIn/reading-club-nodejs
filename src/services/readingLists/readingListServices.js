const prisma = require("../../../prisma/prismaClient");
const { AuthorizationError } = require("../../errors/errors");

const createReadingList = async (list, clubId) => {
  const readingList = await prisma.readingList.create({
    data: {
      name: list.name,
      clubId: clubId,
    },
  });
  return readingList;
};

const findClubIdByListId = async (listId) => {
  const club = await prisma.readingList.findUnique({
    where: {
      id: listId,
    },
    select: {
      clubId: true,
    },
  });
  if (!club) {
    throw new AuthorizationError(
      "Você não tem permissão para alterar as listas desse clube"
    );
  }
  return club.clubId;
};

const updateReadingList = async (list, listId) => {
  const readingList = await prisma.readingList.update({
    where: {
      id: listId,
    },
    data: {
      name: list.name,
    },
  });
  return readingList;
};
module.exports = { createReadingList, findClubIdByListId, updateReadingList };
