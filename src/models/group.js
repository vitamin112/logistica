"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      group.hasMany(models.user);
      group.belongsToMany(models.role, { through: "group_role" });
    }
  }
  group.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "group",
    }
  );
  return group;
};
