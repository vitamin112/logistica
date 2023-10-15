const registerLoginService = require("../service/registerLoginService");

const handleRegister = async (req, res) => {
  //validate
  try {
    if (
      req.body.userName === "" ||
      req.body.email === "" ||
      req.body.phone === "" ||
      req.body.sex === "" ||
      req.body.address === "" ||
      req.body.password === ""
    ) {
      return res.status(200).json({
        message: "You need to enter every field!",
        code: -1,
        data: {},
      });
    }

    //call service to register
    let result = await registerLoginService.handleRegister(req.body);

    //return message
    return res.status(200).json({
      message: result.Message,
      code: result.Code,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      code: -2,
      data: {},
    });
  }
};

const handleLogin = async (req, res) => {
  //validate
  try {
    if (req.body.key === "" || req.body.password === "") {
      return res.status(200).json({
        message: "You need to enter every field! ",
        code: -1,
        data: {},
      });
    }

    let result = await registerLoginService.handleLogin(req.body);

    if (result.code == 1) {
      let options = {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      };

      res.cookie("access_token", result.data?.token, options);

      res.status(200).json({
        message: result.message,
        code: result.code,
        data: result.data,
      });
    } else {
      res.status(200).json({
        message: result.message,
        code: result.code,
        data: {},
      });
    }
  } catch (error) {
    console.log("Login error: ", error);
    return res.status(500).json({
      message: "Something went wrong",
      code: -2,
      data: {},
    });
  }
};
const handleLogout = async (req, res) => {
  res.clearCookie("access_token");
  res.json({
    message: "You are logged out",
    code: 1,
    data: {},
  });
};

const login = (req, res) => {
  res.render("pages/login");
};
const register = (req, res) => {
  res.render("pages/register");
};
module.exports = {
  handleLogin,
  handleRegister,
  handleLogout,
  register,
  login,
};
