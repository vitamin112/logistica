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
      console.log(">>check hash password: ", hashPass);

      await db.User.create({
        userName: rawData.userName.trim(),
        email: rawData.email.trim(),
        phone: rawData.phone.trim(),
        sex: rawData.sex.trim(),
        address: rawData.address.trim(),
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

      let userKey = userData.key.trim();
      let userPassword = userData.password.trim();

      let user = await db.User.findOne({
        where: {
          [Op.or]: [{ email: userKey }, { phone: userPassword }],
        },
        raw: true,
      });

      // check Password
      let isCheckedPassword = await bcrypt.compare(userPassword, user.password);

      if (isCheckedPassword) {
        return {
          message: "login ok",
          code: 1,
          data: {},
        };
      }

      return {
        message: "login failed ",
        code: -1,
        data: {},
      };
    } catch (error) {
      console.log(">>check error", error);
    }
  },
};
