import userService from "../service/userService";

module.exports = {
  async handleCreate(req, res) {
    const userData = req.body;

    let result = await userService.createNewUser(userData);
    if (result) {
      res.redirect("/");
    } else {
      res.render("user/user", { message: "Please check your fields!" });
    }
  },

  async createNewUser(req, res) {
    res.render("user/user", { message: "" });
  },

  async handleDelete(req, res) {
    const id = req.params.id;

    await userService.deleteUser(id);

    res.redirect("back");
  },

  async handleDestroy(req, res) {
    const id = req.params.id;

    await userService.destroyUser(id);

    res.redirect("back");
  },

  async handleRestore(req, res) {
    const id = req.params.id;

    await userService.restore(id);

    res.redirect("back");
  },

  async getById(req, res) {
    const id = req.params.id;

    let user = await userService.getUserById(id);
    if (user) {
      res.render("user/updateUser", { user });
    } else {
      res.send("user not found!");
    }
  },

  async handleShow(req, res) {
    let trash = await userService.getTrash();

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
      let userList = await userService.getUserList();
      res.render("user/home", {
        userList,
        trash,
        pages: 1,
        path: "/user",
        limit: 0,
        currentPage: 0,
      });
    }
  },

  async getTrash(req, res) {
    let trash = await userService.getTrash();
    res.render("user/trash", { trash });
  },

  async handleUpdate(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let address = req.body.address;
    let id = req.body.id;

    try {
      await userService.updateUser(address, name, email, id);
    } catch (error) {
      console.log(error);
    }

    res.redirect("/");
  },
};
