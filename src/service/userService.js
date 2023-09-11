// get the client
import mysql from "mysql2";
//import bcrypt
import bcrypt from "bcryptjs";

// create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "nodejs",
});

const hashPassword = (userPassword) => {
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const createNewUser = (name, email, password) => {
    let hashPass = hashPassword(password);

    connection.query(
        "INSERT INTO users (name, email,password) VALUES (?,?,?)",
        [name, email, hashPass],
        function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        }
    );
};

const getUserList = () => {

    let users = [];

    return connection.query(
        "select * from users ",
        function (err, result) {
            if (err) {
                return users;
                console.log(err);
            }
            users = result;
            console.log("userList: ", users);
            return users;
        }
    );
};

module.exports = {
    createNewUser,
    getUserList
}