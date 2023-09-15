import bcrypt from "bcryptjs";
import db from "../models";
const { Op } = require("sequelize");

const hashPassword = (userPassword) => {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

module.exports = {
  async handleRegister(rawData) {
    try {
      const checkEmail = await db.User.findOne({
        where: { email: rawData.email },
      });
      if (checkEmail !== null) {
        return {
          Message: "Your email address is exists",
          Code: -1,
        };
      }

      const checkPhone = await db.User.findOne({
        where: { phone: rawData.phone },
      });
      if (checkPhone !== null) {
        return {
          Message: "Your phone number is exists",
          Code: -1,
        };
      }

      //hash password
      let hashPass = hashPassword(rawData.password);

      await db.User.create({
        userName: rawData.userName,
        email: rawData.email,
        phone: rawData.phone,
        sex: rawData.sex,
        address: rawData.address,
        password: hashPass,
        groupId: 1,
      });

      return {
        Message: "Your has been registered",
        Code: 1,
      };
    } catch (error) {
      return {
        Message: error,
        Code: 500,
      };
    }
  },
  async handleLogin(userData) {
    try {
      if (userData.key === "" || userData.password === "")
        return {
          message: "you must fill all the fields",
          code: -1,
          data: {},
        };
      let user = await db.User.findOne({
        where: {
          [Op.or]: [{ email: userData.key }, { phone: userData.key }],
        },
        raw: true,
      });
      console.log(user);
      if (user !== null) {
        if (user.password === userData.password)
          return {
            message: "login ok",
            code: 1,
            data: {},
          };
        else {
          return {
            message: "Password is incorrect",
            code: -1,
            data: {},
          };
        }
      } else {
        return {
          message: "login failed",
          code: -1,
          data: {},
        };
      }
    } catch (error) {
      console.log(">>check error", error);
    }
  },
};
