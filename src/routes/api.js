import express from "express";
import apiLoginController from "../controller/apiLoginController";
import postController from "../controller/postController";
import useController from "../controller/userController";

const router = express.Router();

const initApiRouter = (app) => {
  //check authentication
  // router.all("*", authMiddleware.checkToken, authMiddleware.isAuth);

  // api for register login routes
  router.post("/register", apiLoginController.handleRegister);
  router.post("/login", apiLoginController.handleLogin);
  router.get("/register", apiLoginController.register);
  router.get("/login", apiLoginController.login);

  //api for user service

  router.post("/user/create", useController.handleCreate);
  router.put("/user/update/:id", useController.handleUpdate);
  router.delete("/user/delete/:id", useController.handleDelete);
  router.delete("/user/destroy/:id", useController.handleDestroy);
  router.post("/user/restore/:id", useController.handleRestore);
  router.get("/user/trash", useController.getTrash);
  router.get("/user/:id", useController.getById);
  router.get("/user/", useController.handleShow);

  //api for post service
  router.post("/post/create", postController.handleCreate);
  router.put("/post/update/:id", postController.handleUpdate);
  router.delete("/post/delete/:id", postController.handleDelete);
  router.delete("/post/destroy/:id", postController.handleDestroy);
  router.post("/post/restore/:id", postController.handleRestore);
  router.get("/post/trash", postController.getTrash);
  router.get("/post/:id", postController.getById);
  router.get("/post/", postController.handleShow);

  return app.use("/api/v1", router);
};
module.exports = initApiRouter;
