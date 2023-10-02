import bcrypt from "bcryptjs";
import db from "../models";
const { Op } = require("sequelize");

const hashPassword = (userPassword) => {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = async (data) => {
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
};

const deleteUser = async (id) => {
  try {
    await db.user.destroy({
      where: {
        id,
      },
    });
  } catch (e) {
    console.log("Error: ", e);
  }
};

const destroyUser = async (id) => {
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
};

const restore = async (id) => {
  try {
    let user = await db.user.findByPk(id, { paranoid: false });
    if (user) {
      await user.restore();
    }
  } catch (e) {
    console.log("Error: ", e);
  }
};

const getUserList = async () => {
  let users = [];
  users = await db.user.findAll();
  return users;
};

const getTrash = async () => {
  const { count, rows } = await db.user.findAndCountAll({
    paranoid: false,
    where: { deletedAt: { [Op.not]: null } },
  });
  return { count, rows };
};

const getUserById = async (id) => {
  return await db.user.findOne({ where: { id } });
};

const getPagination = async ({ page, limit }) => {
  return await db.user.findAll({ offset: +page, limit: +limit });
};

const updateUser = async (name, email, id) => {
  try {
    await db.user.update(
      { userName: name, email },
      {
        where: {
          id,
        },
      }
    );
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
  getTrash,
  destroyUser,
  restore,
  getPagination,
};
