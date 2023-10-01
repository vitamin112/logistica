import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import connection from "./config/connectBD";
import configViewEngine from "./config/viewEngine";
import initApiRouter from "./routes/api";
import initWebRouter from "./routes/web";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

//config cors middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//config view engine
configViewEngine(app);

//Cookies parser
app.use(cookieParser());

//connection
connection();

//init web routes
initApiRouter(app);
initWebRouter(app);

app.listen(PORT, () => {
  console.log("App is running on the port " + PORT);
});
