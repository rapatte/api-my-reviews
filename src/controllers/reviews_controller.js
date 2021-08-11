const Sequelize = require("sequelize");
const { NotFoundError, BadRequestError } = require("../helpers/errors");
const { Review, Admin, Genre, ReviewGenre } = require("../models");

async function buildGenresArray(genres, reviewId) {
  const genresFromDatabase = await Genre.findAll();
  return genres.map((genre) => {
    const genreFound = genresFromDatabase.find(
      (genreFromDatabase) => genre.name === genreFromDatabase.name
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

  getAllReviewsByTitle: async (search) => {
    const { Op } = Sequelize;
    const reviews = Review.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { category: search },
        ],
      },
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
    if (!reviews) {
      throw new NotFoundError(
        "Ressource introuvable",
        "Cette review n'existe pas"
      );
    }
    return reviews;
  },

  getReview: async (title) => {
    const review = await Review.findOne({
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
      where: { title },
    });
    if (!review) {
      throw new NotFoundError(
        "Cette review n'existe pas",
        "Ressource introuvable"
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
        "Cette review existe déjà",
        "Ressource existante"
      );
    }
    const newReview = await Review.create(data);
    const genre = await Genre.findOne({
      where: {
        name: data.genre[0],
      },
    });
    if (!genre) {
      throw new NotFoundError("Ce genre n'existe pas", "Ressource introuvable");
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

  searchReview: async (title) => {
    const { Op } = Sequelize;
    const reviews = Review.findAll({
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
      where: { title: { [Op.like]: `%${title}%` } },
    });
    return reviews;
  },

  getLatestReviews: async () => {
    const reviews = Review.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
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

  getBestReviews: async () => {
    const reviews = Review.findAll({
      limit: 5,
      order: [["score", "DESC"]],
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

  getTopAnimeReviews: async () => {
    const reviews = Review.findAll({
      limit: 5,
      order: [["score", "DESC"]],
      where: { category: "anime" },
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
  getTopFilmReviews: async () => {
    const reviews = Review.findAll({
      limit: 5,
      order: [["score", "DESC"]],
      where: { category: "film" },
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
  getTopSerieReviews: async () => {
    const reviews = Review.findAll({
      limit: 5,
      order: [["score", "DESC"]],
      where: { category: "serie" },
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
};

module.exports = reviewsController;
