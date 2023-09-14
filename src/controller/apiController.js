const testApi = (req, res) => {
  return res.status(200).json({
    Message: "some message",
  });
};

const register = (req, res) => {
  return res.status(200).json(req.body);
};

module.exports = {
  testApi,
  register,
};
