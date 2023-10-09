import bcrypt from "bcryptjs";
import db from "../models";
const { Op } = require("sequelize");

const hashPassword = (userPassword) => {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};
module.exports = {
  async createNewUser(data) {
    let hashPass = hashPassword(data.password);
    let newUserData = {
      userName: data.userName,
      address: data.address,
      email: data.email,
      phone: data.phone,
      sex: data.sex,
      password: hashPass,
      groupId: 1,
    };
    try {
      if (
        newUserData.userName === "" ||
        newUserData.email === "" ||
        newUserData.phone === "" ||
        newUserData.sex === "" ||
        newUserData.address === "" ||
        newUserData.password === ""
      ) {
        return false;
      } else {
        await db.user.create(newUserData);
        return true;
      }
    } catch (e) {
      console.log("Error: ", e);
      return false;
    }
  },

  async deleteUser(id) {
    try {
      await db.user.destroy({
        where: {
          id,
        },
      });
    } catch (e) {
      console.log("Error: ", e);
    }
  },

  async destroyUser(id) {
    try {
      await db.user.destroy({
        where: {
          id,
        },
        force: true,
      });
    } catch (e) {
      console.log("Error: ", e);
    }
  },

  async restore(id) {
    try {
      let user = await db.user.findByPk(id, { paranoid: false });
      if (user) {
        await user.restore();
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  },

  async getUserList() {
    let users = [];
    users = await db.user.findAll();
    return users;
  },

  async getTrash() {
    let { count, rows } = await db.user.findAndCountAll({
      paranoid: false,
      where: { deletedAt: { [Op.not]: null } },
    });
    return { count, rows };
  },

  async getUserById(id) {
    try {
      return await db.user.findOne({ where: { id } });
    } catch (error) {
      console.log(error);
      return {};
    }
  },

  async getPagination({ page, limit }) {
    try {
      let { count, rows } = await db.user.findAndCountAll({
        offset: page * limit,
        limit: limit,
      });
      return {
        userList: rows,
        pages: Math.ceil(count / limit),
        limit,
        currentPage: page,
      };
    } catch (error) {
      console.log(error);
      return {};
    }
  },

  async updateUser(address, name, email, id) {
    try {
      await db.user.update(
        { userName: name, email, address },
        {
          where: {
            id,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  },
};
