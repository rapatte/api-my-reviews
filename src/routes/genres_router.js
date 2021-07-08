const express = require("express");

const { OK } = require("../helpers/status_codes");

const { getAllGenres } = require("../controllers/genres_controller");

const router = express.Router();

router.get("/", async (request, response) => {
  const genres = await getAllGenres();
  response.status(OK).json(genres);
});

module.exports = router;
