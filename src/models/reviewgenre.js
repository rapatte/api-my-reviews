const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ReviewGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Review, { foreignKey: "reviewId" });
      this.belongsTo(models.Genre, { foreignKey: "genreId" });
    }
  }
  ReviewGenre.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      reviewId: {
        allowNull: false,
        type: DataTypes.UUID,
        onDelete: "CASCADE",
      },
      genreId: {
        allowNull: false,
        type: DataTypes.UUID,
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "ReviewGenre",
    }
  );
  return ReviewGenre;
};
