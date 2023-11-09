import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import connection from "./config/connectBD";
import configViewEngine from "./config/viewEngine";
import initApiRouter from "./routes/api";
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

//config cors middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://github.com/vitamin112/frontend",
      "https://github.com/vitamin112",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
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

//init routes
initApiRouter(app);

app.get("*", (req, res) => {
  res.render("notFound");
});

app.listen(PORT, () => {
  console.log("App is running on the port " + PORT);
});
