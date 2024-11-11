const prisma = require("../../../prisma/prismaClient");
const { AuthorizationError, NotFoundError } = require("../../errors/errors");

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

const deleteReadingList = async (listId) => {
  const readingList = await prisma.readingList.delete({
    where: {
      id: listId,
    },
    select: {
      name: true,
    },
  });

  return readingList;
};

const findReadingListBookById = async (listId, bookId) => {
  const bookList = await prisma.readingListBook.findUnique({
    where: {
      readingListId_bookId: {
        readingListId: listId,
        bookId: bookId,
      },
    },
  })

  if (!bookList) {
    throw new NotFoundError("Livro não encontrado na lista");
  }

  return bookList;

};

const findReadingListById = async (listId) => {
  const readingList = await prisma.readingList.findUnique({
    where: {
      id: listId,
    },
  });

  if (!readingList) {
    throw new NotFoundError("Lista de leitura não encontrada");
  }

  return readingList;
};

const findBooksByReadingListId = async (listId) => {
  const books = await prisma.readingListBook.findMany({
    where: {
      readingListId: listId,
    },
    include: {
      book: true,
    },
  });

  return books;
};

const updateReadingStatus = async (listId, bookId, status) => {
  const readingListBook = await prisma.readingListBook.update({
    where: {
      readingListId_bookId: {
        bookId: bookId,
        readingListId: listId,
      },
    },
    data: {
      status: status,
    },
  })

  if (!readingListBook) {
    throw new NotFoundError("Livro não encontrado na lista");
  }

  return readingListBook;
}
module.exports = {
  createReadingList,
  findClubIdByListId,
  updateReadingList,
  deleteReadingList,
  updateReadingStatus,
  findReadingListById,
  findReadingListBookById,
  findBooksByReadingListId
};
