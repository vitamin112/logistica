"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("post", [
      {
        title: "smith",
        content: "smith@example.com",
        view: 123,
        userId: 2,
        imageId: "2",
        createAt: "2023-03-02",
        status: "active",
        slug: "first post",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "smith",
        content: "smith@example.com",
        view: 123,
        userId: 2,
        imageId: "3",
        createAt: "2023-03-02",
        status: "active",
        slug: "second post",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "smith",
        content: "smith@example.com",
        view: 123,
        userId: 1,
        imageId: "1",
        createAt: "2023-03-02",
        status: "active",
        slug: "third post",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
