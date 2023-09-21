import userApiService from "../service/userApiService";
module.exports = {
  async readAllUser(req, res) {
    try {
      if (req.query.page && req.query.limit) {
        let page = req.query.page;
        let limit = req.query.limit;
        let result = await userApiService.readUsersPagination(+page, +limit);
        return res.status(200).json({
          Message: result.Message,
          Code: result.Code,
          Data: result.Data,
        });
      } else {
        let result = await userApiService.readAllUser();
        return res.status(200).json(result);
      }
    } catch (e) {
      return {
        Message: "Something went wrong!",
        Code: -1,
        Data: [],
      };
    }
  },

  async crateNewUser(req, res) {
    try {
      let result = await userApiService.crateNewUser(req.body);
      return res.status(200).json(result);
    } catch (e) {
      return {
        Message: "Something went wrong!",
        Code: -1,
        Data: [],
      };
    }
  },

  async updateUser(req, res) {
    try {
      let result = await userApiService.updateUser(req.body);
      return res.status(200).json(result);
    } catch (e) {
      return {
        Message: "Something went wrong!",
        Code: -1,
        Data: [],
      };
    }
  },

  async deleteUser(req, res) {
    try {
      let result = await userApiService.deleteUser(req.body.id);
      return res.status(200).json(result);
    } catch (e) {
      return {
        Message: "Something went wrong!",
        Code: -1,
        Data: [],
      };
    }
  },
};
