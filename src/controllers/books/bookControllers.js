const { createBook } = require("../../services/books/bookServices");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../../utils/messages/messages");
const {
  validateBookDataRequest,
} = require("../../utils/validators/validators");

const register = async (req, res) => {
  try {
    const bookData = req.body;
    validateBookDataRequest(bookData);
    const book = await createBook(bookData);
    const response = {
      data: book.id,
      message: "Livro adicionado na base de dados",
    };
    sendSuccessResponse(res, response);
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
};

module.exports = { register };
