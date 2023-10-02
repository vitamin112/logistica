import userService from "../service/userService";

module.exports = {
  async index(req, res) {
    let userList = await userService.getUserList();
    let trash = await userService.getTrash();
    res.render("home", { userList, trash });
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
    let userList = await userService.getPagination(req.query);
    let trash = await userService.getTrash();
    res.render("home", { userList, trash });
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
