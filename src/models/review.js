const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      this.belongsTo(models.Admin, { foreignKey: "adminId", as: "admins" });
      this.belongsToMany(models.Genre, {
        through: "ReviewGenres",
        foreignKey: "reviewId",
        as: "genres",
      });
    }
  }
  Review.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      url_name: DataTypes.STRING,
      title: DataTypes.STRING,
      resume: DataTypes.STRING,
      trailer: DataTypes.STRING,
      score: DataTypes.NUMBER,
      poster: DataTypes.STRING,
      category: DataTypes.STRING,
      adminId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
