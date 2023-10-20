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
const handleRes = function (res, isCheck, fn) {
  if (isCheck) {
    let result = fn;
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
    }
  },

  async handleUpdate(req, res) {
    let id = req.params.id;
    let rawData = { ...req.body };

    handleRes(
      res,
      checkUserPermission(req.user, id),
      await userService.update(id, rawData)
    );
  },

  async handleDelete(req, res) {
    const id = req.params.id;
    if (checkAdminPermission(req.user) && req.user.userID !== id) {
      let result = await userService.delete(id);

      res.status(200).json({
        message: result.message,
        code: result.code,
        data: result.data,
      });
    } else {
      res.status(200).json({
        message: "delete failed!",
        code: -1,
        data: {},
      });
    }
  },

  async handleDestroy(req, res) {
    let id = req.params.id;

    if (checkAdminPermission(req.user) && req.user.userID !== id) {
      let result = await userService.destroy(id);
      res.status(200).json({
        message: result.message,
        code: result.code,
        data: result.data,
      });
    } else {
      res.status(200).json({
        message: "delete failed!",
        code: -1,
        data: {},
      });
    }
  },

  async handleRestore(req, res) {
    let id = req.params.id;

    handleRes(
      res,
      checkAdminPermission(req.user),
      await userService.restore(id)
    );
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

    handleRes(
      res,
      checkUserPermission(req.user, id),
      await userService.getById(id)
    );
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
    handleRes(res, checkAdminPermission(req.user), await userService.trash());
  },

  async createNewUser(req, res) {
    res.render("user/user", { message: "" });
  },

  async resetPassword(req, res) {
    const key = req.body.key;
    const code = req.body.code;
    const newPassword = req.body.password;

    let result = await userService.resetPassword(key, code, newPassword);

    res.status(200).json({
      message: result.message,
      code: result.code,
      data: result.data,
    });
  },

  async generateResetCode(req, res) {
    const key = req.body.key;

    let result = await userService.generateResetCode(key);

    if (result.code == 1) {
      res.status(200).json({
        message: result.message,
        code: result.code,
        data: result.data,
      });
    } else {
      res.status(404).json({
        message: "Please check your phone number or email address",
        code: -1,
        data: {},
      });
    }
  },

  async changePassword(req, res) {
    const id = req.params.id;
    let newPass = req.body.password;
    handleRes(
      res,
      checkUserPermission(req.user, id),
      await userService.changePassword(id, newPass)
    );
  },
};
