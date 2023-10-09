import { verify } from "jsonwebtoken";
import db from "../models";
const { Op } = require("sequelize");

const ignoreRole = ["/", "/api/v1/login", "/api/v1/register"];

module.exports = {
  async checkToken(req, res, next) {
    const path = req.path;
    if (ignoreRole.includes(path)) {
      next();
    } else {
      const token =
        req.header("Authorization")?.replace("Bearer ", "") ||
        req.query.token ||
        req.cookies["token"];

      if (token) {
        try {
          let decoded = verify(token, process.env.SECRET_KEY);

          let dateNow = new Date();

          if (decoded.exp < dateNow.getTime() / 1000) {
            console.log("Token expired");
            res.redirect("/api/v1/login");
          } else {
            req.user = decoded;
            next();
          }
        } catch (error) {
          console.log("Verify token error: ", error);
          res.json("Invalid token!");
        }
      } else {
        res.redirect("/api/v1/login");
      }
    }
  },

  async isAuth(req, res, next) {
    const path = req.path;

    if (ignoreRole.includes(path)) {
      next();
    } else {
      if (req.user) {
        try {
          //get role from db
          let userData = await db.group.findOne({
            where: { name: req.user.group },
            attributes: [["name", "group"]],
          });

          if (
            userData &&
            req.user &&
            userRoles.includes(path) &&
            req.user.roles.includes(path)
          ) {
            next();
          } else {
            res.json("401 Unauthorized Error");
          }
        } catch (error) {
          console.log("Verify token error: ", error);
          res.json("Invalid token!");
        }
      }
    }
  },
};
