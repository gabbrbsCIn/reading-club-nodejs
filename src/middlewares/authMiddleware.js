const { sendErrorResponse } = require("../utils/messages/messages");
const { extractTokenFromHeader, verifyJWTToken } = require("../utils/token/token");

const authToken = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers);
    const decodeToken = verifyJWTToken(token);
    req.user = decodeToken;
    next();
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
};

module.exports = authToken;
