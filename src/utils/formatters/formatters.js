const { AuthorizationError } = require("../../errors/errors");

const extractTokenFromBearer = (token) => {
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  return token;
};

const extractTokenFromHeader = (req) => {
  let token = req["authorization"];
  if (!token) {
    throw new AuthorizationError("Nenhum token foi inserido");
  }
  token = extractTokenFromBearer(token);
  return token;
};

module.exports = { extractTokenFromHeader };
