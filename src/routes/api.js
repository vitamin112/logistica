import express from "express";
import apiLoginController from "../controller/apiLoginController";
import apiController from "../controller/apiController";

const router = express.Router();

const initApiRouter = (app) => {
  // api for register login routes
  router.post("/register", apiLoginController.register);
  router.post("/login", apiLoginController.login);
  router.get("/test-api", apiLoginController.testApi);

  //api for user service
  router.get("/user/read", apiController.readAllUser);
  router.post("/user/create", apiController.crateNewUser);
  router.put("/user/update", apiController.updateUser);
  router.delete("/user/delete", apiController.deleteUser);

  return app.use("/api/", router);
};
module.exports = initApiRouter;
