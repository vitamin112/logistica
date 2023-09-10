import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();

const initWebRouter = (app) => {
    router.get('/', homeController.index)
    router.get('/user', homeController.user)
    router.post('/users/create-user', homeController.handleCreateNewUser)

    return app.use("/", router);
}
module.exports = initWebRouter;
