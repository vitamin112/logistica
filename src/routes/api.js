import express from "express";
import apiController from "../controller/apiController";

const router = express.Router();

const initApiRouter = (app) => {
  router.post("/register", apiController.register);
  router.post("/login", apiController.login);
  router.get("/test-api", apiController.testApi);

  return app.use("/api/", router);
};
module.exports = initApiRouter;
