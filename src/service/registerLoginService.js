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

      //hash password
      let hashPass = hashPassword(rawData.password);

      await db.user.create({
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
        attributes: ["userName", "password"],
        include: [
          {
            model: db.group,
            attributes: ["name"],
            include: [
              {
                model: db.role,
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

        const urls = user.group.roles
          ? user.group.roles.map((role) => role.url)
          : [];

        if (isCheckedPassword) {
          //create a token
          let payload = {
            userName: user.userName,
            group: user.group.name,
            roles: urls,
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
