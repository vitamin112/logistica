// get the client
import mysql from 'mysql2';
// create the connection to database

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'nodejs'
});

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

        connection.query(
            "INSERT INTO users (name, email,password) VALUES (?,?,?)",
            [name, email, password],
            function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });

        res.send("<h1>Done</h1>");
    },
}