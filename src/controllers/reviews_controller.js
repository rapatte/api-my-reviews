const { NotFoundError, BadRequestError } = require("../helpers/errors");
const { Review, Admin, Genre, ReviewGenre } = require("../models");

async function buildGenresArray(genres, reviewId) {
  const genresFromDatabase = await Genre.findAll();
  return genres.map((genre) => {
    const genreFound = genresFromDatabase.find(
      (genreFromDatabase) => genre === genreFromDatabase
    );
    if (!genre) {
      throw new NotFoundError("Ressource introuvable", "Ce genre n'existe pas");
    }
    return {
      reviewId,
      genreId: genreFound.id,
    };
  });
}

const reviewsController = {
  getAllReviews: async () => {
    const reviews = Review.findAll({
      order: [["title", "ASC"]],
      attributes: { exclude: ["adminId"] },
      include: [
        {
          model: Genre,
          as: "genres",
          through: { attributes: [] },
          attributes: ["name", "id"],
        },
        {
          model: Admin,
          as: "admins",
          attributes: ["firstName", "lastName"],
        },
      ],
    });
    return reviews;
  },

  getReview: async (title) => {
    const review = Review.findOne({
      where: {
        title,
      },
      attributes: { exclude: ["adminId"] },
      include: [
        {
          model: Admin,
          as: "admins",
          attributes: ["firstName", "lastname"],
        },
        {
          model: Genre,
          as: "genres",
          through: { attributes: [] },
          attributes: ["name"],
        },
      ],
    });
    if (!review) {
      throw new NotFoundError(
        "Ressource introuvable",
        "Cette review n'existe pas"
      );
    }
    return review;
  },

  addReview: async (data) => {
    const { title } = data;
    const review = await Review.findOne({
      where: {
        title,
      },
    });
    if (review) {
      throw new BadRequestError(
        "Ressource existante",
        "Cette review existe déjà"
      );
    }
    const newReview = await Review.create(data);
    const genre = await Genre.findOne({
      where: {
        name: data.genre[0],
      },
    });
    if (!genre) {
      throw new NotFoundError("Ressource introuvable", "Ce genre n'existe pas");
    }
    await ReviewGenre.create({
      reviewId: newReview.id,
      genreId: genre.id,
    });
    return newReview;
  },

  updateReview: async (title, data) => {
    const reviewFound = await Review.findOne({
      include: [
        {
          model: Admin,
          as: "admins",
          attributes: ["firstName", "lastName"],
        },
        {
          model: Genre,
          as: "genres",
          through: { attributes: [] },
          attributes: ["name"],
        },
      ],
      where: { title },
    });
    if (!reviewFound) {
      throw new NotFoundError(
        "Ressource introuvable",
        "Cette review n'existe pas"
      );
    }

    const reviewUpdated = await reviewFound.update(data);
    const genresToUpdate = await buildGenresArray(
      data.genres,
      reviewUpdated.id
    );
    await ReviewGenre.destroy({
      where: { reviewId: reviewUpdated.id },
    });

    await ReviewGenre.bulkCreate(genresToUpdate);

    const review = await Review.findOne({
      where: {
        title,
      },
      attributes: { exclude: ["adminId"] },
      include: [
        {
          model: Admin,
          attributes: ["firstName", "lastName"],
          as: "admins",
        },
        {
          model: Genre,
          as: "genres",
          through: { attributes: [] },
        },
      ],
    });

    return review;
  },

  deleteReview: async (title) => {
    const reviewFound = await Review.findOne({
      where: { title },
    });
    if (!reviewFound) {
      throw new NotFoundError(
        "Ressource introuvable",
        "Cet review n'existe pas"
      );
    }
    await Review.destroy({
      where: { title },
    });
    return {};
  },
};

module.exports = reviewsController;
