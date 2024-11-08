const prisma = require("../../../prisma/prismaClient");

const createReadingList = async (list, clubId) => {
  const readingList = await prisma.readingList.create({
    data: {
      name: list.name,
      clubId: clubId,
    },
  });
  return readingList;
};
module.exports = { createReadingList };
