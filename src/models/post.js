"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      post.belongsTo(models.user);
      post.hasMany(models.comment);
      post.belongsTo(models.image);
    }
  }
  post.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      slug: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      view: DataTypes.INTEGER,
      imageId: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      freezeTableName: true,
      modelName: "post",
    }
  );
  return post;
};
