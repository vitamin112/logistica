import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRouter from "./routes/web";
import initApiRouter from "./routes/api";
import bodyParser from "body-parser";
import connection from "./config/connectBD";
import configCors from "./config/cors";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//config cors middleware
configCors(app);

//config view engine
configViewEngine(app);

//connection
connection();

//init web routes
initWebRouter(app);
initApiRouter(app);

app.listen(PORT, () => {
  console.log("App is running on the port " + PORT);
});
