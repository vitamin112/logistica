import userService from '../service/userService'

module.exports = {
    async index(req, res) {
        let userList = await userService.getUserList()
        res.render("home", { userList });
    },

    handleCreateNewUser(req, res) {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        userService.createNewUser(name, email, password);

        res.redirect("/");
    },

    handleDeleteUser(req, res) {
        const id = req.params.id;

        userService.deleteUser(id);

        res.redirect("/");
    },

    async getUserToUpdate(req, res) {
        const id = req.params.id;

        let users = await userService.getUserById(id);

        res.render("updateUser", { user: users[0] });
    },

    async showUserList(req, res) {
        let userList = await userService.getUserList();
        res.render("user", { userList });
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
