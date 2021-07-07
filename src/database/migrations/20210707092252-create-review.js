module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Reviews", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.fn("uuid_generate_v4"),
      },
      title: {
        type: Sequelize.STRING(50),
      },
      resume: {
        type: Sequelize.STRING(500),
      },
      trailer: {
        type: Sequelize.STRING(100),
      },
      score: {
        type: Sequelize.INTEGER,
      },
      poster: {
        type: Sequelize.STRING(100),
      },
      category: {
        type: Sequelize.STRING(50),
      },
      genre: {
        type: Sequelize.STRING(50),
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
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Reviews");
  },
};
