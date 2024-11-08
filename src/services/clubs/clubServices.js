const prisma = require("../../../prisma/prismaClient");

const createClub = async (data) => {
  const club = await prisma.club.create({ data: data });
  return club;
};

module.exports = { createClub };
