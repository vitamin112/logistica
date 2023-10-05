"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("User", [
      {
        userName: "John 1",
        email: "example@example.com",
        password: "123",
        address: "HaNoi",
        phone: "0987-654-321",
        sex: "male",
        groupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: "smith",
        email: "smith@example.com",
        password: "smith",
        address: "HaLong",
        phone: "0987-654-321",
        sex: "male",
        groupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: "Anna",
        email: "example@example.com",
        password: "321",
        address: "HCM",
        phone: "0987-654-321",
        sex: "female",
        groupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
