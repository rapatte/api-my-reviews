const express = require("express");

const { OK, CREATED } = require("../helpers/status_codes");
const {
  getAllReviews,
  getReview,
  addReview,
  deleteReview,
  updateReview,
} = require("../controllers/reviews_controller");
const { reviewValidation } = require("../validators");
const { ValidationError } = require("../helpers/errors");

const router = express.Router();

router.get("/", async (request, response) => {
  const reviews = await getAllReviews();
  response.status(OK).json(reviews);
});

router.post("/", async (request, response) => {
  const review = request.body;
  const errors = reviewValidation(review);
  if (errors) throw new ValidationError(errors);

  const reviewToAdd = {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    ...review,
    url_name: review.title.toLowerCase().replace(/ /g, "-"),
  };

  const newReview = await addReview(reviewToAdd);
  response.status(CREATED).json(newReview);
});

router.get("/:title", async (request, response) => {
  const dj = await getReview(request.params.name);
  response.status(OK).json(dj);
});

router.put("/:title", async (request, response) => {
  const review = request.body;
  const errors = reviewValidation(review);
  if (errors) throw new ValidationError(errors);

  const reviewToUpdate = {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    ...review,
    url_name: review.title.toLowerCase().replace(/ /g, "-"),
  };

  const reviewUpdated = await updateReview(
    request.params.title,
    reviewToUpdate
  );
  response.status(OK).json(reviewUpdated);
});

router.delete("/:title", async (request, response) => {
  await deleteReview(request.params.title);
  response.status(OK).json({ message: "La review est supprimée avec succès" });
});

module.exports = router;
