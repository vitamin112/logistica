import express from "express";
import projectController from "../controller/projectController";

const router = express.Router();

const projectRouter = (app) => {
  router.post("/create", projectController.handleCreate);
  router.get("/create", projectController.create);
  router.get("/", projectController.handleShow);

  return app.use("/project", router);
};
module.exports = projectRouter;
