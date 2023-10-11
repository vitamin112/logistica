import userService from "../service/userService";

const checkUserPermission = (user, targetID) => {
  if (user.userID === +targetID || user.group === "admin") {
    return true;
  }
  return false;
};
const checkAdminPermission = (user) => {
  if (user.group === "admin") {
    return true;
  }
  return false;
};

module.exports = {
  async handleCreate(req, res) {
    const userData = req.body;

    let result = await userService.create(userData);
    if (result) {
      res.status(200).json({
        message: result.message,
        code: result.code,
        data: result.data,
      });
    } else {
      res.status(200).json({
        message: result.message,
        code: result.code,
        data: result.data,
      });
    }
  },

  async handleUpdate(req, res) {
    let id = req.params.id;

    if (checkUserPermission(req.user, id)) {
      let rawData = { ...req.body };

      let result = await userService.update(id, rawData);
      res.status(200).json({
        message: result.message,
        code: result.code,
        data: result.data,
      });
    } else {
      res.status(200).json({
        message: "you don't have permission!",
        code: -1,
        data: {},
      });
    }
  },

  async handleDelete(req, res) {
    const id = req.params.id;
    if (checkAdminPermission(req.user) && req.userID !== id) {
      let result = await userService.delete(id);

      res.status(200).json({
        message: result.message,
        code: result.code,
        data: result.data,
      });
    } else {
      res.status(200).json({
        message: "you can't delete yourself",
        code: -1,
        data: {},
      });
    }
  },

  async handleDestroy(req, res) {
    let id = req.params.id;

    if (checkAdminPermission(req.user) && req.userID !== id) {
      let result = await userService.destroy(id);
      res.status(200).json({
        message: result.message,
        code: result.code,
        data: result.data,
      });
    } else {
      res.status(200).json({
        message: "you can't delete yourself",
        code: -1,
        data: {},
      });
    }
  },

  async handleRestore(req, res) {
    let id = req.params.id;

    if (checkAdminPermission(req.user)) {
      let result = await userService.restore(id);
      res.status(200).json({
        message: result.message,
        code: result.code,
        data: result.data,
      });
    } else {
      res.status(200).json({
        message: "you don't have permission!",
        code: -1,
        data: {},
      });
    }
  },

  async getProfile(req, res) {
    const id = req.params.id;

    let result = await userService.getProfile(id);

    res.status(200).json({
      message: result.message,
      code: result.code,
      data: result.data,
    });
  },

  async getById(req, res) {
    const id = req.params.id;

    if (checkUserPermission(req.user, id)) {
      let result = await userService.getById(id);
      res.status(200).json({
        message: result.message,
        code: result.code,
        data: result.data,
      });
    } else {
      res.status(200).json({
        message: "you don't have permission!",
        code: -1,
        data: {},
      });
    }
  },

  async handleShow(req, res) {
    if (checkAdminPermission(req.user)) {
      let trash = await userService.trash();

      if (req.query.page && req.query.page) {
        let { userList, pages, limit, currentPage } =
          await userService.getPagination({
            page: +req.query.page,
            limit: +req.query.limit,
          });
        res.render("user/home", {
          userList,
          trash,
          pages,
          path: "/user",
          limit,
          currentPage,
        });
      } else {
        let result = await userService.read();
        res.status(200).json({
          message: result.message,
          code: result.code,
          data: result.data,
        });
      }
    } else {
      res.status(200).json({
        message: "you don't have permission!",
        code: -1,
        data: {},
      });
    }
  },

  async getTrash(req, res) {
    if (checkAdminPermission(req.user)) {
      let result = await userService.trash();
      res.status(200).json({
        message: result.message,
        code: result.code,
        data: result.data,
      });
    } else {
      res.status(200).json({
        message: "user don't have permission ",
        code: -1,
        data: {},
      });
    }
  },

  async createNewUser(req, res) {
    res.render("user/user", { message: "" });
  },
};
