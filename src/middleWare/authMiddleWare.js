import { verify } from "jsonwebtoken";
import db from "../models";
const { Op } = require("sequelize");

module.exports = {
  async withToken(req, res, next) {
    let userKey = req.body.key;
    let password = req.body.password;
    try {
      if (!userKey || !password)
        res.json({
          message: "you must fill all the fields",
          code: -1,
          data: {},
        });
      else {
        userKey = String(userKey).trim();
        password = String(password).trim();

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
          // kiểm tra nếu có token
          if (req.cookies.access_token) {
            try {
              if (verify(req.cookies.access_token, process.env.SECRET_KEY)) {
                next();
              }
            } catch (error) {
              res.json({
                message: "token is invalid!",
                code: -1,
                data: {},
              });
              console.log("Some thing went wrong with token: ");
              console.log(error);
            }
          } else {
            next();
          }
        } else {
          res.json({
            message:
              "Login failed! Please try checking your email/ phone number or password!",
            code: -1,
            data: {},
          });
        }
      }
    } catch (error) {
      console.log(">>check error", error);
    }
  },

  async isAuth(req, res, next) {
    const ignoreRole = ["/login", "/register"];
    const path = req.path;

    if (ignoreRole.includes(path)) next();
    else {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (token) {
        try {
          let decoded = verify(token, process.env.SECRET_KEY);

          //get role from db
          let userData = await db.group.findOne({
            where: { name: decoded.group },
            attributes: [["name", "group"]],
            include: [
              {
                model: db.role,
                attributes: ["url"],
                through: {
                  attributes: [],
                },
              },
            ],
          });

          let userroles = userData.roles.map((role) => role.url);
          //compare roles

          if (
            userData &&
            decoded &&
            userroles.includes(path) &&
            decoded.roles.includes(path)
          ) {
            req.user = decoded;
            next();
          } else {
            res.json("401 Unauthorized Error");
          }
        } catch (error) {
          res.json("Invalid token!");
        }
      } else {
        res.json("Unknown user");
      }
    }
  },
};
