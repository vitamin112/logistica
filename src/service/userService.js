import bcrypt from "bcryptjs";
import db from "../models";

const hashPassword = (userPassword) => {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = async (name, email, password) => {
  let hashPass = hashPassword(password);
  try {
    await db.User.create({ userName: name, email, password: hashPass });
  } catch (e) {
    console.log("Error: ", e);
  }
};

const deleteUser = async (id) => {
  try {
    await db.User.destroy({
      where: {
        id,
      },
    });
  } catch (e) {
    console.log("Error: ", e);
  }
};

const getUserList = async () => {
  let test = await db.User.findOne({
    where: { id: 1 },
    include: { model: db.Group },
    raw: true,
    nest: true,
  });

  console.log(">>> test found user relationships: ", test);

  let users = [];
  users = await db.User.findAll();
  return users;
};

const getUserById = async (id) => {
  return await db.User.findOne({ where: { id } });
};

const updateUser = async (name, email, id) => {
  try {
    await db.User.update(
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
};
