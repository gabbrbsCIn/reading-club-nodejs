class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "Erro de validação";
    this.statusCode = 400;
  }
}

class AuthenticationError extends Error {
  constructor(message = "Autenticação falhou") {
    super(message);
    this.name = "AuthenticationError";
    this.statusCode = 401;
  }
}

class AuthorizationError extends Error {
  constructor(
    message = "Você não tem permissão para acessar essa funcionalidade"
  ) {
    super(message);
    this.name = "AuthorizationError";
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message = "Não encontrado") {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

module.exports = {
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
};
