const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../helpers/errors");

const isAuth = (request, response, next) => {
  // const token = request.cookies.authcookie;
  const token = request.headers.authorization.split("Bearer ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      throw new UnauthorizedError("You must be login");
    } else {
      const { exp } = user;
      if (Date.now() / 1000 >= exp) {
        response.clearCookie("authcookie");

        throw new UnauthorizedError("You must be login");
      }

      request.user = user;
      next();
    }
  });
};

module.exports = isAuth;
