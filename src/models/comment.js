"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comment.belongsTo(models.user);
      comment.belongsTo(models.post);
    }
  }
  comment.init(
    {
      postId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "comment",
    }
  );
  return comment;
};
