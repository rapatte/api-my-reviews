const { Genre } = require("../models");

const GenresController = {
  getAllGenres: async () => {
    const Genres = await Genre.findAll({
      order: [["name", "ASC"]],
      attributes: ["name", "id"],
      raw: true,
    });
    return Genres;
  },
};

module.exports = GenresController;
