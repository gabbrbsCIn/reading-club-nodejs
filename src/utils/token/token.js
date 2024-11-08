const { AuthorizationError } = require("../../errors/errors");
const jwt = require("jsonwebtoken");

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

const verifyJWTToken = (token) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  const decodeToken = jwt.verify(token, JWT_SECRET_KEY, (error, decoded) => {
    if (error) {
      throw new AuthorizationError(error.message);
    }
    return decoded;
  });
  return decodeToken;
};

const generateJWTToken = (user) => {
  const payload = { id: user.id };
  const secretKey = process.env.JWT_SECRET_KEY;
  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN,
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

module.exports = { extractTokenFromHeader, verifyJWTToken, generateJWTToken };
