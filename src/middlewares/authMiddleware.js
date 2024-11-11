const { checkTokenInBlackList } = require("../services/users/userServices");
const { sendErrorResponse } = require("../utils/messages/messages");
const { extractTokenFromHeader, verifyJWTToken } = require("../utils/token/token");

const authToken = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers);
    await checkTokenInBlackList(token);
    const decodedToken = verifyJWTToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
};

module.exports = authToken;
