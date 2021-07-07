const express = require("express");
require("express-async-errors");

const reviewsRouter = require("./reviews_router");

const mainRouter = express.Router();

mainRouter.use("/reviews", reviewsRouter);

module.exports = mainRouter;
