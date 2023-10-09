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

//check authentication
// app.all("*", authMiddleware.checkToken, authMiddleware.isAuth);

//init routes
initWebRouter(app);
initApiRouter(app);

app.get("*", (req, res) => {
  res.render("notFound");
});
app.listen(PORT, () => {
  console.log("App is running on the port " + PORT);
});
