const { validateDataRequest } = require("../../utils/validators/validators");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../../utils/messages/messages");
const { createUser } = require("../../services/users/userServices");


const register = async (req, res) => {
  try {
    const userData = req.body;
    validateDataRequest(userData);
    const user = await createUser(userData);
    const response = { data: user, msg: "Usuário criado com sucesso" };
    sendSuccessResponse(res, response);
  } catch (error) {
    console.log(error);
    await sendErrorResponse(res, error);
  }
};

module.exports = {
  register,
};
