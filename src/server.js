import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRouter from "./routes/web";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

//config view engine
configViewEngine(app);

//init web routes
initWebRouter(app);


app.listen(PORT, () => {
    console.log("App is running on the port " + PORT);
})