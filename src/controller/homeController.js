import userService from '../service/userService'

module.exports = {
    index(req, res, next) {
        res.render("home");
    },

    user(req, res, next) {
        res.render("user");
    },

    handleCreateNewUser(req, res, next) {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        let userList = userService.getUserList();

        res.json("userService.getUserList()");
        console.log("userList: ", userList);
    },
};
