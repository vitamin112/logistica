import userService from "../service/userService";

module.exports = {
  async index(req, res) {
    let userList = await userService.getUserList();
    res.render("home", { userList });
  },

  async handleCreateNewUser(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    await userService.createNewUser(name, email, password);
    res.redirect("/");
  },

  handleDeleteUser(req, res) {
    const id = req.params.id;

    userService.deleteUser(id);

    res.redirect("/");
  },

  async getUserToUpdate(req, res) {
    const id = req.params.id;

    let user = await userService.getUserById(id);

    res.render("updateUser", { user });
  },

  async showUserList(req, res) {
    let userList = await userService.getUserList();
    res.render("user", { userList });
  },

  async handleUpdateUser(req, res) {
    let url = req.url;
    let userRoles = req.user.Roles;

    console.log(userRoles, req.url);
    console.log(userRoles.includes(url));

    if (req.user.Roles.includes(url)) console.log("you don't have permission!");

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
