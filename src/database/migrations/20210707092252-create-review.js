module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Reviews", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.fn("uuid_generate_v4"),
      },
      url_name: {
        type: Sequelize.STRING(50),
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      resume: {
        type: Sequelize.STRING(500),
      },
      trailer: {
        type: Sequelize.STRING(100),
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      poster: {
        type: Sequelize.STRING(100),
      },
      category: {
        type: Sequelize.STRING(50),
      },
      adminId: {
        type: Sequelize.UUID,
        references: {
          model: "Admins",
          key: "id",
        },
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
