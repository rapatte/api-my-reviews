const genres = require("../seeds/genres");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("Genres", genres, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Genres", null, {});
  },
};
