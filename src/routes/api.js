import express from "express";
import apiController from "../controller/apiController";
import apiLoginController from "../controller/apiLoginController";
import { isAuth, withToken } from "../middleWare/authMiddleWare";

const router = express.Router();

const initApiRouter = (app) => {
  // api for register login routes
  router.post("/register", apiLoginController.register);
  router.post("/login", withToken, apiLoginController.login);

  app.use("/", isAuth);
  //api for user service
  router.get("/user/read", apiController.readAllUser);
  router.post("/user/create", apiController.crateNewUser);
  router.put("/user/update", apiController.updateUser);
  router.delete("/user/delete", apiController.deleteUser);

  return app.use("/api/v1", router);
};
module.exports = initApiRouter;
