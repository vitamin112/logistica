// get the client
import mysql from "mysql2/promise";
//import bcrypt
import bcrypt from "bcryptjs";
// get the promise implementation, we will use bluebird
const bluebird = require('bluebird');

const hashPassword = (userPassword) => {
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const createNewUser = async (name, email, password) => {

    let hashPass = hashPassword(password);

    const connection = await mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: "12345678",
            database: 'nodejs',
            Promise: bluebird
        }
    );
    try {
        // query database
        const [rows, fields] = await connection.execute("INSERT INTO users (name, email,password) VALUES (?,?,?)",
            [name, email, hashPass]);
    }
    catch (e) {
        console.log("Error: ", e);
    }
};

const deleteUser = async (id) => {

    const connection = await mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: "12345678",
            database: 'nodejs',
            Promise: bluebird
        }
    );
    try {
        // query database
        const [rows, fields] = await connection.execute("DELETE FROM users WHERE id=?",
            [id]);
    }
    catch (e) {
        console.log("Error: ", e);
    }
};

const getUserList = async () => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: "12345678",
            database: 'nodejs',
            Promise: bluebird
        }
    );

    let users = [];

    // query database
    const [rows, fields] = await connection.execute('SELECT * FROM users');
    return rows;
};

const getUserById = async (id) => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: "12345678",
            database: 'nodejs',
            Promise: bluebird
        }
    );

    // query database
    const [user, fields] = await connection.execute('SELECT * FROM users where id=?', [id]);
    return user;
};

const updateUser = async (name, email, id) => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: "12345678",
            database: 'nodejs',
            Promise: bluebird
        }
    );
    try {
        // query database
        const [rows, fields] = await connection.execute('UPDATE users SET name = ?, email = ? WHERE id =? ', [name, email, id]);

    } catch (e) {
        console.log(e);
    }

};

module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUser,
}