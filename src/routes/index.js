const express = require("express");
require("express-async-errors");

const reviewsRouter = require("./reviews_router");
const adminsRouter = require("./admins_router");
const genresRouter = require("./genres_router");

const mainRouter = express.Router();

mainRouter.use("/reviews", reviewsRouter);
mainRouter.use("/admins", adminsRouter);
mainRouter.use("/genres", genresRouter);

module.exports = mainRouter;
