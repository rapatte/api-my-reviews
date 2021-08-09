/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../helpers/errors");

const isAuth = (request, response, next) => {
  // const token = request.headers.cookie.split("authcookie=")[1]; // appels via postman
  const token = request.headers.authorization.split("Bearer ")[1]; // appels via navigateur

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      console.log(error);
      throw new UnauthorizedError("Vous devez être connecté");
    } else {
      const { exp } = user;
      if (Date.now() / 1000 >= exp) {
        response.clearCookie("authcookie");

        throw new UnauthorizedError("Vous devez être connecté");
      }
      request.user = user;
      next();
    }
  });
};

module.exports = isAuth;
