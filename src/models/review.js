const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Admin, { foreignKey: "adminId", as: "admin" });
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
      genre: DataTypes.STRING,
      adminId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
