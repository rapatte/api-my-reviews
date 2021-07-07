const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Review, { foreignKey: "reviewId", as: "reviews" });
    }
  }
  Admin.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      mail: DataTypes.STRING,
      password: DataTypes.STRING,
      reviewId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );
  return Admin;
};
