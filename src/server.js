import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRouter from "./routes/web";
import bodyParser from "body-parser";
import connection from "./config/connectBD";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//config view engine
configViewEngine(app);

//connection
connection();

//init web routes
initWebRouter(app);

app.listen(PORT, () => {
  console.log("App is running on the port " + PORT);
});
