import express from "express";
import homeController from "../controller/homeController";
import apiLoginController from "../controller/apiLoginController";

const router = express.Router();

const initWebRouter = (app) => {
  router.get("/user", homeController.showUserList);
  router.post("/user/create-user", homeController.handleCreateNewUser);
  router.post("/user/delete-user/:id", homeController.handleDeleteUser);
  router.get("/update-user/:id", homeController.getUserToUpdate);
  router.post("/user/update-user", homeController.handleUpdateUser);
  router.get("/", homeController.index);

  // test API
  router.get("/api/test-api", apiLoginController.testApi);

  return app.use("/", router);
};
module.exports = initWebRouter;
