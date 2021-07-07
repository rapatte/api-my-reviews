const { Review } = require("../models");

const reviewsController = {
  getAllReviews: async () => {
    const reviews = Review.findAll({
      order: [["title", "ASC"]],
      raw: true,
    });
    return reviews;
  },
};

module.exports = reviewsController;
