import bcrypt from "bcryptjs";
import db from "../models";

const hashPassword = (userPassword) => {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};
module.exports = {
  async readUsersPagination(page, limit) {
    try {
      let offset = (page - 1) * limit;

      let { count, rows } = await db.User.findAndCountAll({
        offset,
        limit,
      });

      let totalPages = Math.ceil(count / limit);

      if (rows) {
        return {
          Message: "Successfully",
          Code: 1,
          Data: {
            ListUsers: rows,
            totalPages,
            totalRows: count,
          },
        };
      }
      return {
        Message: "Nothing!",
        Code: -1,
        Data: [],
      };
    } catch (error) {
      console.log(error);
      return {
        Message: "Something went wrong!",
        Code: -1,
        Data: [],
      };
    }
  },

  async readAllUser() {
    try {
      let ListUsers = await db.User.findAll({
        attributes: ["userName", "email", "phone"],
        include: {
          model: db.Group,
          attributes: ["name", "description"],
        },
      });
      if (ListUsers) {
        return {
          Message: "Successfully",
          Code: 1,
          Data: ListUsers,
        };
      }
      return {
        Message: "Nothing!",
        Code: -1,
        Data: [],
      };
    } catch (error) {
      console.log(error);
      return {
        Message: "Something went wrong!",
        Code: -1,
        Data: [],
      };
    }
  },

  async crateNewUser(data) {
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
        return res.status(200).json({
          message: "You need to enter every field!",
          code: -1,
          data: {},
        });
      }
      let ListUsers = await db.User.create(newUserData);
      return {
        Message: "Successfully",
        Code: 1,
        Data: [],
      };
    } catch (error) {
      console.log(error);
      return {
        Message: "Something went wrong!",
        Code: -1,
        Data: [],
      };
    }
  },

  async updateUser(userData) {
    try {
      let result = await db.User.update(
        {
          userName: userData.userName,
          address: userData.address,
          email: userData.email,
          phone: userData.phone,
          sex: userData.sex,
        },
        {
          where: {
            id: userData.id,
          },
        }
      );
      if (result[0] === 1) {
        return {
          Message: "Done!",
          Code: 1,
          Data: [],
        };
      }
      return {
        Message: "Update error!",
        Code: -1,
        Data: [],
      };
    } catch (error) {
      console.log(error);
      return {
        Message: "Something went wrong!",
        Code: -1,
        Data: [],
      };
    }
  },

  async deleteUser(id) {
    try {
      let result = await db.User.destroy({
        where: {
          id,
        },
      });
      console.log(result);
      if (result === 1) {
        return {
          Message: "Successfully",
          Code: 1,
          Data: [],
        };
      }
      return {
        Message: "Delete error!",
        Code: -1,
        Data: [],
      };
    } catch (error) {
      console.log(error);
      return {
        Message: "Something went wrong!",
        Code: -1,
        Data: [],
      };
    }
  },
};
