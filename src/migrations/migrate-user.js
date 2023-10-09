"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "user",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        imgId: {
          type: Sequelize.INTEGER,
        },
        userName: {
          type: Sequelize.STRING,
          collate: "utf8mb4_unicode_ci",
        },
        address: {
          type: Sequelize.STRING,
          collate: "utf8mb4_unicode_ci",
        },
        email: {
          type: Sequelize.STRING,
        },
        phone: {
          type: Sequelize.STRING,
        },
        sex: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        dob: {
          type: Sequelize.DATE,
        },
        groupId: {
          type: Sequelize.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE,
        },
      },
      {
        charset: "utf8",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user");
  },
};
