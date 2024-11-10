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

const getAllClubs = async () => {
  const clubs = await prisma.club.findMany({
    include: {
      readingLists: {
        include: {
          books: true,
        },
      }
    },
  });

  return clubs;
}


const getCompletedReadBooksCount = async (clubId) => {
  const completedBooks = await prisma.readingListBook.count({
    where: {
      readingList: {
        clubId: clubId,
      },
      status: 'completed',
    },
  });

  return completedBooks;
}

const getClubsReadingAverage = async (clubs) => {
  const averages = await Promise.all(
    clubs.map(async (club) => {
      const totalBooks = club.readingLists.reduce((acc, readingList) => acc + readingList.books.length, 0);

      if (totalBooks === 0) {
        return {
          clubId: club.id,
          clubName: club.name,
          completedReadAverage: 0,
        };
      }
      const completedReadBooks = await getCompletedReadBooksCount(club.id);
      const completedReadAverage = (completedReadBooks / totalBooks);

      return {
        clubId: club.id,
        clubName: club.name,
        completedReadAverage,
      };
    })
  );

  return averages;
};

module.exports = {
  createClub,
  findClubById,
  JoinAUserToClub,
  findUserClubById,
  updateClub,
  deleteClubById,
  getAllClubs,
  getClubsReadingAverage,
};
