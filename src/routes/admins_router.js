const express = require("express");

const { OK, CREATED } = require("../helpers/status_codes");
const {
  getAllAdmins,
  add,
  login,
} = require("../controllers/admins_controller");

const router = express.Router();

router.get("/", async (request, response) => {
  const admins = await getAllAdmins();
  response.status(OK).json(admins);
});

router.post("/", async (request, response) => {
  const user = request.body;

  const newUser = await add(user);
  response.status(CREATED).json(newUser);
});

router.post("/login", async (request, response) => {
  const user = await login(request.body.mail, request.body.password);
  const MAXAGE = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour of expiration
  response.cookie("authcookie", user.token, { maxAge: MAXAGE });
  response.status(OK).json({ user, token: user.token });
});

module.exports = router;
