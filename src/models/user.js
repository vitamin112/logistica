"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.group);
      user.belongsToMany(models.project, { through: "project_user" });
    }
  }
  user.init(
    {
      userName: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      sex: DataTypes.STRING,
      password: DataTypes.STRING,
      groupId: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_unicode_ci",
      modelName: "user",
    }
  );
  return user;
};
