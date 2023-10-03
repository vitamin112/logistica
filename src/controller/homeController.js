import userService from "../service/userService";

module.exports = {
  async index(req, res) {
    let userList = await userService.getUserList();
    let trash = await userService.getTrash();
    res.render("home", { userList, trash, pages: 1, limit: 0, currentPage: 0 });
  },

  async handleCreateNewUser(req, res) {
    const userData = req.body;

    let result = await userService.createNewUser(userData);
    if (result) {
      res.redirect("/");
    } else {
      res.send("Failed to create");
    }
  },

  async createNewUser(req, res) {
    res.render("user");
  },

  async handleDeleteUser(req, res) {
    const id = req.params.id;

    await userService.deleteUser(id);

    res.redirect("back");
  },

  async handleDestroyUser(req, res) {
    const id = req.params.id;

    await userService.destroyUser(id);

    res.redirect("back");
  },

  async handleRestore(req, res) {
    const id = req.params.id;

    await userService.restore(id);

    res.redirect("back");
  },

  async getUserToUpdate(req, res) {
    const id = req.params.id;

    let user = await userService.getUserById(id);
    if (user) {
      res.render("updateUser", { user });
    } else {
      res.send("user not found!");
    }
  },

  async showPagination(req, res) {
    console.log("check req: ", req.query);
    let { userList, pages, limit, currentPage } =
      await userService.getPagination({
        page: +req.query.page,
        limit: +req.query.limit,
      });
    let trash = await userService.getTrash();
    res.render("home", { userList, trash, pages, limit, currentPage });
  },

  async showTrash(req, res) {
    let trash = await userService.getTrash();
    res.render("trash", { trash });
  },

  async handleUpdateUser(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let id = req.body.id;

    try {
      await userService.updateUser(name, email, id);
    } catch (error) {
      console.log(error);
    }

    res.redirect("/");
  },
};
