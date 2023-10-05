import express from "express";
import projectController from "../controller/projectController";

const router = express.Router();

const projectRouter = (app) => {
  router.post("/create", projectController.handleCreate);
  router.get("/create", projectController.create);
  router.get("/update/:id", projectController.update);
  router.post("/update", projectController.handleUpdate);
  router.post("/delete/:id", projectController.handleDelete);
  router.get("/", projectController.handleShow);

  return app.use("/project", router);
};
module.exports = projectRouter;
