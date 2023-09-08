import express from "express";

const router = express.Router();

const initWebRouter = (app) => {
    router.get('/', (req, res) => {
        return res.send('hello world')
    })
    return app.use("/", router);
}
module.exports = initWebRouter;
