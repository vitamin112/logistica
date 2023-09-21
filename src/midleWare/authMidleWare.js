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
    const token = req.cookies.access_token;
    if (token) {
      let decoded = verify(token, process.env.SECRET_KEY);
      res.json(decoded);
    } else {
      res.json("Unknown user");
    }
  },
};
