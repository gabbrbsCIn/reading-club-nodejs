const prisma = require("../../../prisma/prismaClient");

const createBook = async (bookData) => {
  const book = await prisma.book.create({ data: bookData });
  return book;
};

module.exports = { createBook };
