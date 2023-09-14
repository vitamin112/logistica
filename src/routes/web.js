import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController";

const router = express.Router();

const initWebRouter = (app) => {
  router.get("/user", homeController.showUserList);
  router.post("/user/create-user", homeController.handleCreateNewUser);
  router.post("/user/delete-user/:id", homeController.handleDeleteUser);
  router.get("/update-user/:id", homeController.getUserToUpdate);
  router.post("/user/update-user", homeController.handleUpdateUser);
  router.get("/", homeController.index);

  // test API
  router.get("/api/test-api", apiController.testApi);

  return app.use("/", router);
};
module.exports = initWebRouter;
