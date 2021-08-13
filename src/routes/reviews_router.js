/* eslint-disable node/no-unsupported-features/es-syntax */
const express = require("express");
const { OK, CREATED } = require("../helpers/status_codes");
const {
  getAllReviews,
  getReview,
  addReview,
  deleteReview,
  updateReview,
  searchReview,
  getLatestReviews,
  getBestReviews,
  getTopAnimeReviews,
  getTopSerieReviews,
  getTopFilmReviews,
  getAllReviewsByTitle,
} = require("../controllers/reviews_controller");
const { reviewValidation } = require("../validators");
const { ValidationError } = require("../helpers/errors");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.get("/", async (request, response) => {
  const reviews = await getAllReviews();
  response.status(OK).json(reviews);
});

router.get("/review/:name", async (request, response) => {
  const { name } = request.params;
  const reviews = await getAllReviewsByTitle(name);
  response.status(OK).json(reviews);
});

router.get("/latest", async (request, response) => {
  const reviews = await getLatestReviews();
  response.status(OK).json(reviews);
});

router.get("/best", async (request, response) => {
  const reviews = await getBestReviews();
  response.status(OK).json(reviews);
});

router.get("/anime", async (request, response) => {
  const reviews = await getTopAnimeReviews();
  response.status(OK).json(reviews);
});
router.get("/film", async (request, response) => {
  const reviews = await getTopFilmReviews();
  response.status(OK).json(reviews);
});
router.get("/serie", async (request, response) => {
  const reviews = await getTopSerieReviews();
  response.status(OK).json(reviews);
});

router.post("/", async (request, response) => {
  const review = request.body;
  const errors = reviewValidation(review);
  if (errors) throw new ValidationError(errors);

  const reviewToAdd = {
    ...review,
    url_name: review.title.toLowerCase().replace(/ /g, "-"),
  };

  const newReview = await addReview(reviewToAdd);
  response.status(CREATED).json(newReview);
});

router.get("/:title", async (request, response) => {
  const review = await getReview(request.params.title);
  response.status(OK).json(review);
});

router.put("/:title", async (request, response) => {
  const review = request.body;
  const errors = reviewValidation(review);

  const reviewToUpdate = {
    ...review,
    url_name: review.title.toLowerCase().replace(/ /g, "-"),
  };

  if (errors) throw new ValidationError(errors);
  const reviewUpdated = await updateReview(
    request.params.title,
    reviewToUpdate
  );
  response.status(OK).json(reviewUpdated);
});

router.delete("/:title", isAuth, async (request, response) => {
  await deleteReview(request.params.title);
  response.status(OK).json({ message: "La review est supprimée avec succès" });
});

router.get(`/search`, async (request, response) => {
  const { term } = request.query;
  const review = await searchReview(term);
  response.status(OK).json(review);
});

module.exports = router;
