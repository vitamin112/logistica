require("dotenv").config();

module.exports = function configCors(app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.REACT_URL);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
};
