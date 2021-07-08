const express = require("express");

const { OK } = require("../helpers/status_codes");
const { getAllAdmins, getAdmin } = require("../controllers/admins_controller");

const router = express.Router();

router.get("/", async (request, response) => {
  const admins = await getAllAdmins();
  response.status(OK).json(admins);
});

router.get("/:name", async (request, response) => {
  const admin = await getAdmin(request.params.lastName);
  response.status(OK).json(admin);
});

module.exports = router;
