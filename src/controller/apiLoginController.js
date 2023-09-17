const registerLoginService = require("../service/registerLoginService");

const testApi = (req, res) => {
  return res.status(200).json({
    Message: "some message",
  });
};

const register = async (req, res) => {
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
      message: "Something went wrong",
      code: -2,
      data: {},
    });
  }
};

const login = async (req, res) => {
  //validate
  try {
    if (req.body.key === "" || req.body.password === "") {
      return res.status(200).json({
        message: "You need to enter every field!",
        code: -1,
        data: {},
      });
    }

    //call service to register
    let result = await registerLoginService.handleLogin(req.body);

    //return message
    return res.status(200).json({
      message: result.message,
      code: result.code,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      code: -2,
      data: {},
    });
  }
};

module.exports = {
  testApi,
  register,
  login,
};
