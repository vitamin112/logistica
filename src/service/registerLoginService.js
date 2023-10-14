import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../models";
const { Op } = require("sequelize");

const hashPassword = (userPassword) => {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};
const renderRoles = (id) => {
  const roles = [];
  roles.map((id) => {});
  return roles;
};
module.exports = {
  async handleRegister(rawData) {
    if (
      rawData.email === undefined ||
      rawData.password === undefined ||
      rawData.email === "" ||
      rawData.password === ""
    )
      return {
        Message: "you must fill all the fields",
        Code: -1,
        Data: {},
      };

    let userKey = String(rawData.key).trim();
    let userPassword = String(rawData.password).trim();

    try {
      const checkEmail = await db.user.findOne({
        where: { email: rawData.email },
      });

      if (checkEmail !== null) {
        return {
          Message: "Your email address is exists",
          Code: -1,
        };
      }

      const checkPhone = await db.user.findOne({
        where: { phone: rawData.phone },
      });

      if (checkPhone !== null) {
        return {
          Message: "Your phone number is exists",
          Code: -1,
        };
      }

      let hashPass = hashPassword(rawData.password);

      await db.user.create({
        userName: rawData.userName.trim(),
        email: rawData.email.trim(),
        phone: rawData.phone.trim(),
        img: rawData.img,
        dob: rawData.dob,
        sex: rawData.sex,
        address: rawData.address.trim(),
        password: hashPass,
        groupId: 2,
      });
      return {
        Message: "Your has been registered",
        Code: 1,
      };
    } catch (error) {
      console.log("Error: ", error);
      return {
        Message: "Registered failed",
        Code: 500,
      };
    }
  },

  async handleLogin(userData) {
    try {
      if (!userData.key || !userData.password)
        return {
          message: "you must fill all the fields",
          code: -1,
          data: {},
        };

      let userKey = String(userData.key).trim();
      let userPassword = String(userData.password).trim();

      let user = await db.user.findOne({
        where: {
          [Op.or]: [{ email: userKey }, { phone: userKey }],
        },
        attributes: ["userName", "password", "id"],
        include: [
          {
            model: db.group,
            attributes: ["name"],
          },
        ],
      });

      if (user) {
        let isCheckedPassword = await bcrypt.compare(
          userPassword,
          user.password
        );
        if (isCheckedPassword) {
          //create a token
          let payload = {
            userName: user.userName,
            group: user.group.name,
            userID: user.id,
          };
          let secretKey = process.env.SECRET_KEY;

          let token = jwt.sign(payload, secretKey, {
            expiresIn: 1000 * 60 * 60,
          });

          return {
            message: "login successful",
            code: 1,
            data: {
              payload,
              token,
            },
          };
        }
      }
      return {
        message: "Phone/ email or password is incorrect!",
        code: -1,
        data: {},
      };
    } catch (error) {
      console.log(">>check error", error);
    }
  },
};
