import bcrypt from "bcryptjs";
import db from "../models";
import jwt from "jsonwebtoken";
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
      if (!userData.key || !userData.password)
        return {
          message: "you must fill all the fields",
          code: -1,
          data: {},
        };

      let userKey = String(userData.key).trim();
      let userPassword = String(userData.password).trim();

      let user = await db.User.findOne({
        where: {
          [Op.or]: [{ email: userKey }, { phone: userKey }],
        },
        attributes: ["userName", "password"],
        include: [
          {
            model: db.Group,
            attributes: ["name"],
            include: [
              {
                model: db.Role,
                attributes: ["url"],
                through: {
                  attributes: [],
                },
              },
            ],
          },
        ],
      });
      if (user) {
        let isCheckedPassword = await bcrypt.compare(
          userPassword,
          user.password
        );

        const urls = user.Group.Roles
          ? user.Group.Roles.map((role) => role.url)
          : [];

        if (isCheckedPassword) {
          //create a token
          let payload = {
            userName: user.userName,
            Group: user.Group.name,
            Roles: urls,
          };
          let secretKey = process.env.SECRET_KEY;

          let jwtToken = jwt.sign(payload, secretKey, {
            expiresIn: 30 * 30 * 1000,
          });

          return {
            message: "login successful",
            code: 1,
            data: {
              payload,
              jwtToken,
            },
          };
        }
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
