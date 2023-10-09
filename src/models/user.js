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
      user.hasMany(models.post);
      user.hasMany(models.comment);
      user.hasOne(models.image);
    }
  }
  user.init(
    {
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      sex: DataTypes.STRING,
      dob: DataTypes.DATE,
      imgId: DataTypes.STRING,
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
