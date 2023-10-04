"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class project_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  project_user.init(
    {
      projectId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "project_user",
    }
  );
  return project_user;
};
