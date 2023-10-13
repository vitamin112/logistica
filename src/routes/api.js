import express from "express";
import apiLoginController from "../controller/apiLoginController";
import commentController from "../controller/commentController";
import postController from "../controller/postController";
import useController from "../controller/userController";
import authMiddleware from "../middleWare/authMiddleWare";

const router = express.Router();

const initApiRouter = (app) => {
  // api for register login routes
  router.post("/register", apiLoginController.handleRegister);
  router.post("/login", apiLoginController.handleLogin);
  router.get("/register", apiLoginController.register);
  router.get("/login", apiLoginController.login);

  //check authentication
  router.all("*", authMiddleware.checkToken);

  router
    .delete("/user/destroy/:id", useController.handleDestroy)
    .delete("/user/delete/:id", useController.handleDelete)
    .put("/user/update/:id", useController.handleUpdate)
    .post("/user/restore/:id", useController.handleRestore)
    .get("/user/trash", useController.getTrash)
    .post("/user/create", useController.handleCreate)
    .get("/user/profile/:id", useController.getProfile)
    .get("/user/:id/trash", postController.getUserPostTrash)
    .get("/user/:id/post", postController.getUserPost)
    .get("/user/:id", useController.getById)
    .get("/user", useController.handleShow);

  router
    .delete("/post/delete/:id", postController.handleDelete)
    .delete("/post/destroy/:id", postController.handleDestroy)
    .post("/post/create", postController.handleCreate)
    .put("/post/update/:id", postController.handleUpdate)
    .post("/post/restore/:id", postController.handleRestore)
    .get("/post/trash", postController.getTrash)
    .delete("/post/:postId/comment/:cmtId", commentController.handleDestroy)
    .put("/post/:postId/comment/:cmtId", commentController.handleUpdate)
    .post("/post/:id/comment", commentController.handleCreate)
    .get("/post/:id/comment", commentController.handleShow)
    .get("/post/:id", postController.getById)
    .get("/post", postController.handleShow);

  return app.use("/api/v1", router);
};
module.exports = initApiRouter;
