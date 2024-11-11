const { validateDataRequest } = require("../../utils/validators/validators");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../../utils/messages/messages");
const {
  createUser,
  userAuthenticate,
  updateUserById,
  deleteUserById,
  addTokenToBlacklist,
} = require("../../services/users/userServices");

const { generateJWTToken, extractTokenFromHeader } = require("../../utils/token/token");

const register = async (req, res) => {
  try {
    const userData = req.body;
    validateDataRequest(userData, "register");
    const user = await createUser(userData);
    const response = {
      data: user.email,
      message: "Usuário criado com sucesso",
    };
    sendSuccessResponse(res, response);
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
};

const login = async (req, res) => {
  try {
    const userData = req.body;
    validateDataRequest(userData, "login");
    const user = await userAuthenticate(userData);
    const token = generateJWTToken(user);
    const response = { token: token, message: "Usuário logado com sucesso" };
    sendSuccessResponse(res, response);
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
};

const update = async (req, res) => {
  try {
    const userData = req.body;
    const userId = req.user.id;
    validateDataRequest(userData, "update");
    const user = await updateUserById(userData, userId);
    const response = {
      data: user.email,
      message: "Dados do usuário editados com sucesso0",
    };
    sendSuccessResponse(res, response);
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
};

const destroy = async (req, res) => {
  try {
    const userId = req.user.id;
    await deleteUserById(userId);
    const response = {
      message: "Usuário deletado com sucesso",
    };
    sendSuccessResponse(res, response);
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
};

const logout = async (req, res) => {
  try {
    const token = extractTokenFromHeader(req.headers);
    if (token) {
      await addTokenToBlacklist(token);
    }
    sendSuccessResponse(res, { message: "Usuário deslogado com sucesso" });
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
}

module.exports = {
  register,
  login,
  update,
  destroy,
  logout
};
