import { verify } from "jsonwebtoken";
import db from "../models";
const { Op } = require("sequelize");

const ignoreRole = ["/login", "/register"];

module.exports = {
  async checkToken(req, res, next) {
    const path = req.path;

    if (ignoreRole.includes(path)) {
      next();
    } else {
      const token =
        req.header("Authorization")?.replace("Bearer ", "") ||
        req.query.token ||
        req.cookies["access_token"];

      if (token) {
        try {
          let decoded = verify(token, process.env.SECRET_KEY);

          const user = await db.user.findOne({ where: { id: decoded.userID } });
          if (user) {
            let dateNow = new Date();

            if (decoded.exp < dateNow.getTime() / 1000) {
              res.json({
                message: "Token is expired!",
                code: -1,
                data: {},
              });
            } else {
              req.user = decoded;
              next();
            }
          } else {
            res.json({
              message: "Token is invalid!",
              code: -1,
              data: {},
            });
          }
        } catch (error) {
          console.log("Verify token error: ", error);
          res.json({
            message: "Token is invalid!",
            code: -1,
            data: {},
          });
        }
      } else {
        res.json({
          message: "Token is not found",
          code: -1,
          data: {},
        });
      }
    }
  },

  async userPermissions(req, res, next) {
    const path = req.path;
    const url = req.path;

    console.log("url: ", url);
    console.log("path: ", path);

    if (ignoreRole.includes(path)) {
      next();
    } else {
      if (req.user) {
        if (req.user.group === "admin") {
          next();
        } else {
          console.log(req.user.userID);

          if (req.params.id == req.user.userID) {
            next();
          } else {
            res.json({
              message: "Access denied!",
              code: -1,
              data: {},
            });
          }
        }
      }
    }
  },
  async postPermissions(req, res, next) {
    const path = req.path;
    const url = req.path;

    console.log("url: ", url);
    console.log("path: ", path);

    if (ignoreRole.includes(path)) {
      next();
    } else {
      if (req.user) {
        if (req.user.group === "admin") {
          next();
        } else {
          console.log(req.user.userID);

          if (req.params.id == req.user.userID) {
            next();
          } else {
            res.json({
              message: "Access denied!",
              code: -1,
              data: {},
            });
          }
        }
      }
    }
  },
};
