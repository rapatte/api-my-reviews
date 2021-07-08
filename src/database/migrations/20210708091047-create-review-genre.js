module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ReviewGenres", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.fn("uuid_generate_v4"),
      },
      reviewId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Reviews",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      genreId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Genres",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("ReviewGenres");
  },
};
