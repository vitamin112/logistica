"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("group", [
      {
        name: "user",
        description: "this is user group",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "admin",
        description: "this is admin group",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
