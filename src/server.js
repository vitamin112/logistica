import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRouter from "./routes/web";
import initApiRouter from "./routes/api";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { isAuth } from "./midleWare/authMidleWare";
import connection from "./config/connectBD";
import cors from "cors";

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

app.use("/", isAuth);

//init web routes
initApiRouter(app);
initWebRouter(app);

app.listen(PORT, () => {
  console.log("App is running on the port " + PORT);
});
