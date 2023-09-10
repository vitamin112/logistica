const express = require('express');
import configViewEngine from "./configs/viewEngine";
import initWebRouter from "./routes/web";
import bodyParser from "body-parser";
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 3000;

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config view engine
configViewEngine(app);

//init web routes
initWebRouter(app);

app.listen(PORT, () => {
    console.log("App is running on the port " + PORT);
})