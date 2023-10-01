"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class group_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  group_role.init(
    {
      groupId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "group_role",
    }
  );
  return group_role;
};
