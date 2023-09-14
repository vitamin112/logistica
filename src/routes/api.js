import express from "express";
import apiController from "../controller/apiController";

const router = express.Router();

const initApiRouter = (app) => {
  router.get("/test-api", apiController.testApi);
  router.post("/register", apiController.register);

  return app.use("/api/", router);
};
module.exports = initApiRouter;
