import bcrypt from "bcryptjs";
import db from "../models";
const { Op } = require("sequelize");

const hashPassword = (userPassword) => {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

module.exports = {
  async create(data) {
    try {
      if (
        data.userName == "" ||
        data.email == "" ||
        data.phone == "" ||
        data.sex == "" ||
        data.address == "" ||
        data.password == undefined
      ) {
        return {
          message: "you must to fill all the fields",
          code: -1,
          data: {},
        };
      } else {
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
        let newUser = await db.user.create(newUserData);
        return {
          message: "success",
          code: 1,
          data: { user: newUser.dataValues },
        };
      }
    } catch (e) {
      console.log("Error: ", e);
      return {
        message: "something went wrong! Please try again",
        code: -1,
        data: {},
      };
    }
  },

  async read(reqUser) {
    let userList = await db.user.findAll();
    let { rows, count } = await db.user.findAndCountAll({
      paranoid: false,
      where: { deletedAt: { [Op.not]: null } },
    });
    return {
      message: "success",
      code: 1,
      data: { userList, trash: { rows, count } },
    };
  },

  async getById(id) {
    let user = await db.user.findOne({ where: { id }, raw: true });
    if (user) {
      return {
        message: "Success",
        code: 1,
        data: user,
      };
    } else {
      return {
        message: "user are not found",
        code: -1,
        data: user,
      };
    }
  },

  async getProfile(id) {
    let user = await db.user.findOne({
      where: { id },
      attributes: [
        "id",
        "userName",
        "email",
        "phone",
        "address",
        "sex",
        "dob",
        "imgId",
        "groupId",
      ],
      raw: true,
    });
    if (user) {
      return {
        message: "Success",
        code: 1,
        data: user,
      };
    } else {
      return {
        message: "user are not found",
        code: -1,
        data: user,
      };
    }
  },

  async update(id, data) {
    let user = await db.user.update(data, { where: { id } });

    if (user[0]) {
      return {
        message: "Success",
        code: 1,
        data: {},
      };
    } else {
      return {
        message: "update failed",
        code: -1,
        data: {},
      };
    }
  },

  async delete(id) {
    let user = await db.user.destroy({ where: { id } });

    if (user) {
      return {
        message: "Success",
        code: 1,
        data: {},
      };
    } else {
      return {
        message: "delete failed",
        code: -1,
        data: {},
      };
    }
  },

  async destroy(id) {
    try {
      let user = await db.user.destroy({
        where: {
          id,
        },
        force: true,
      });
      if (user) {
        return {
          message: "Success",
          code: 1,
          data: { user },
        };
      } else {
        return {
          message: "delete failed",
          code: -1,
          data: {},
        };
      }
    } catch (e) {
      console.log("Error: ", e);
      return {
        message: "some thing went wrong! please try again",
        code: -1,
        data: {},
      };
    }
  },

  async trash() {
    try {
      const { count, rows } = await db.user.findAndCountAll({
        paranoid: false,
        where: { deletedAt: { [Op.not]: null } },
      });
      return {
        message: "success",
        code: 1,
        data: { count, rows },
      };
    } catch (e) {
      console.log("Error: ", e);
      return {
        message: "something went wrong, please try again",
        code: -1,
        data: { count, rows },
      };
    }
  },

  async restore(id) {
    try {
      let user = await db.user.findByPk(id, { paranoid: false });
      if (user) {
        let result = await user.restore();
        return {
          message: "success",
          code: 1,
          data: { user: result.dataValues },
        };
      } else {
        return {
          message: "can't find user!",
          code: -1,
          data: {},
        };
      }
    } catch (e) {
      console.log("Error: ", e);
      return {
        message: "something went wrong, please try again",
        code: -1,
        data: {},
      };
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

  async getUserPost() {
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

  async getUserPostTrash() {
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
};
