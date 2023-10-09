import express from "express";

const router = express.Router();

const initWebRouter = (app) => {
  // //api for user service
  // router.get("/user/read", apiController.readAllUser);
  // router.post("/user/create", apiController.crateNewUser);
  // router.put("/user/update", apiController.updateUser);
  // router.delete("/user/delete", apiController.deleteUser);
  // router.get("/", apiController.readAllUser);

  // // manager user
  // router.get("/trash", userController.showTrash);
  // router.get("/user/create-user", userController.createNewUser);
  // router.post("/create-user", userController.handleCreateNewUser);
  // router.get("/update-user/:id", userController.getUserToUpdate);
  // router.post("/user/update-user", userController.handleUpdateUser);
  // router.post("/restore/:id", userController.handleRestore);
  // router.post("/user/delete-user/:id", userController.handleDeleteUser);
  // router.post("/user/destroy/:id", userController.handleDestroyUser);
  // router.get("/user", userController.showPagination);

  // //manager post
  // router.post("/project/create", postController.handleCreate);
  // router.get("/project/create", postController.create);
  // router.get("/project/update/:id", postController.update);
  // router.post("/project/update", postController.handleUpdate);
  // router.post("/project/delete/:id", postController.handleDelete);
  // router.post("/project/destroy/:id", postController.handleDestroy);
  // router.get("/project/trash", postController.getTrash);
  // router.post("/project/restore/:id", postController.handleRestore);
  // router.get("/project/", postController.handleShow);

  // router.get("/", userController.index);
  return app.use("/", router);
};
module.exports = initWebRouter;
