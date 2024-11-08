const prisma = require("../../../prisma/prismaClient");
const { NotFoundError } = require("../../errors/errors");

const createBook = async (bookData) => {
  const book = await prisma.book.create({ data: bookData });
  return book;
};

const findBookById = async (bookId) => {
  const book = await prisma.book.findFirst({
    where: {
      id: bookId,
    },
  });
  if (!book) {
    throw new NotFoundError("Livro não encontrado");
  }
  return book;
};

const addBookToList = async (listId, bookId) => {
  const bookList = await prisma.readingListBook.create({
    data: {
      readingListId: listId,
      bookId: bookId,
      status: "to-read"
    },
  });

  return bookList;
};

module.exports = { createBook, findBookById, addBookToList };
