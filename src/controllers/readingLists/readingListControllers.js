const {
  createReadingList, updateReadingList,
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

module.exports = { register, update };
