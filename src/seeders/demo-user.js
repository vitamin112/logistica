"use strict";
import bcrypt from "bcryptjs";

const hashPassword = (userPassword) => {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("User", [
      {
        userName: "John 1",
        email: "new@example.com",
        password: hashPassword("123"),
        address: "HaNoi",
        phone: "0987-654-321",
        sex: "male",
        groupId: 1,
        dob: "2002-03-02",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: "smith",
        email: "smith@example.com",
        password: hashPassword("123"),
        address: "HaLong",
        phone: "0987-654-321",
        sex: "male",
        dob: "2002-03-02",
        groupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: "Anna",
        email: "ngloc@example.com",
        password: hashPassword("123"),
        address: "HCM",
        phone: "0987-654-321",
        sex: "female",
        dob: "2002-03-02",
        groupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
