import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();

const initWebRouter = (app) => {
  router.get("/user/create-user", homeController.createNewUser);
  router.post("/create-user", homeController.handleCreateNewUser);
  router.get("/update-user/:id", homeController.getUserToUpdate);
  router.post("/user/update-user", homeController.handleUpdateUser);
  router.post("/restore/:id", homeController.handleRestore);
  router.post("/user/delete-user/:id", homeController.handleDeleteUser);
  router.post("/user/destroy/:id", homeController.handleDestroyUser);
  router.get("/user", homeController.showPagination);
  router.get("/trash", homeController.showTrash);
  router.get("/", homeController.index);

  return app.use("/", router);
};
module.exports = initWebRouter;
