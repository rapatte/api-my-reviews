const express = require("express");

const { OK, CREATED } = require("../helpers/status_codes");
const { add, login } = require("../controllers/admins_controller");

const router = express.Router();

router.post("/singup", async (request, response) => {
  const user = request.body;

  const newUser = await add(user);
  response.status(CREATED).json(newUser);
});

router.post("/login", async (request, response) => {
  const user = await login(request.body.email, request.body.password);
  const MAXAGE = Math.floor(Date.now() / 1000) + 60 * 60; // 1 heure d'expiration
  response.cookie("authcookie", user.token, { maxAge: MAXAGE });
  response.status(OK).json({ user, token: user.token });
});

module.exports = router;
