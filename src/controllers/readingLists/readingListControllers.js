const {
  findBookById,
  addBookToList,
  deleteBookFromAList,
} = require("../../services/books/bookServices");
const {
  createReadingList,
  updateReadingList,
  deleteReadingList,
} = require("../../services/readingLists/readingListServices");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../utils/messages/messages");
const {
  validateListDataRequest,
} = require("../../utils/validators/validators");

const register = async (req, res) => {
  try {
    const listData = req.body;
    const clubId = req.params.id;
    validateListDataRequest(listData);
    const readingList = await createReadingList(listData, clubId);
    const response = {
      data: readingList,
      message: "Lista de Leitura criada com sucesso",
    };
    sendSuccessResponse(res, response);
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
};

const update = async (req, res) => {
  try {
    const listData = req.body;
    const listId = req.params.id;
    validateListDataRequest(listData);
    const readingList = await updateReadingList(listData, listId);

    const response = {
      data: readingList,
      message: "Lista de Leitura atualizada com sucesso",
    };
    sendSuccessResponse(res, response);
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
};

const destroy = async (req, res) => {
  try {
    const listId = req.params.id;
    const readingList = await deleteReadingList(listId);
    const response = {
      data: readingList,
      message: "Lista deletada com sucesso",
    };
    sendSuccessResponse(res, response);
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
};

const addBook = async (req, res) => {
  try {
    const listId = req.params.id;
    const bookId = req.params.bookId;
    await findBookById(bookId);

    await addBookToList(listId, bookId);
    sendSuccessResponse(res, {
      message: "Livro adicionado à lista com sucesso",
    });
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
};

const deleteBook = async (req, res) => {
  try {
    const listId = req.params.id;
    const bookId = req.params.bookId;
    await findBookById(bookId);
    const bookList = await deleteBookFromAList(listId, bookId);

    const response = { data: bookList, message: "Livro deletado da lista" };
    sendSuccessResponse(res, response);
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
};

module.exports = { register, update, destroy, addBook, deleteBook };
