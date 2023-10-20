import bcrypt from "bcryptjs";
import NodeCache from "node-cache";
import nodemailer from "nodemailer";
import db from "../models";
const { Op } = require("sequelize");

const resetPasswordCache = new NodeCache();

const hashPassword = (userPassword) => {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const sendResetEmail = async (code) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "xuboom54321@gmail.com",
      pass: "dutc kqft jofr ddbs",
    },
  });

  var mailOptions = {
    from: "xuboom54321@gmail.com",
    to: "xuboom12345@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
    html: "<h2>This is your reset password code: </h2>  <h3>" + code + "</h3>",
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return 1;
    } else {
      console.log("Email sent: " + info.response);
      return -1;
    }
  });
};

function getRandomCode() {
  const min = 0;
  const max = 999999;
  const randomNumber = Math.floor(Math.random() * (max + 1));
  const formattedNumber = randomNumber.toString().padStart(6, "0");
  return formattedNumber;
}

function getResetPasswordCode(userId) {
  const code = resetPasswordCache.get(userId);
  resetPasswordCache.del(userId);
  return code;
}

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

  async generateResetCode(key) {
    try {
      let user = await db.user.findOne({
        where: {
          [Op.or]: [{ email: key }, { phone: key }],
        },
        attributes: ["email", "password", "id"],
      });

      if (user) {
        let code = getRandomCode();

        resetPasswordCache.set(user.email, code, 900);

        sendResetEmail(code);

        return {
          message:
            "The reset password code was sent to your email, please check your email, and login again.",
          code: 1,
          data: {},
        };
      } else {
        return {
          message: "User not found",
          code: -1,
          data: {},
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Something went wrong! Please try again",
        code: -1,
        data: {},
      };
    }
  },

  async resetPassword(key, code, newPassword) {
    const storedCode = resetPasswordCache.get(key);

    if (storedCode !== null && storedCode === code) {
      resetPasswordCache.del(key);
      let password = hashPassword(newPassword);

      try {
        let user = await db.user.findOne({
          where: {
            [Op.or]: [{ email: key }, { phone: key }],
          },
          attributes: ["email", "password", "id"],
        });
        if (user) {
          user.password = password;
          user.save();
          return {
            message: "Password changed",
            code: 1,
            data: {},
          };
        } else {
          return {
            message: "User not found",
            code: -1,
            data: {},
          };
        }
      } catch (error) {
        console.log(error);
        return {
          message: "Something went wrong! Please try again",
          code: -1,
          data: {},
        };
      }
    } else {
      return {
        message: "The verify code incorrect!",
        code: -1,
        data: {},
      };
    }
  },

  async changePassword(id, newPass) {
    try {
      let user = await db.user.findOne({
        where: { id },
      });

      if (!isNaN(newPass) && typeof newPass === "number") {
        newPass = newPass.toString();
      }

      if (user) {
        user.password = hashPassword(newPass);

        user.save();

        return {
          message: "Password changed",
          code: 1,
          data: {},
        };
      } else {
        return {
          message: "User not found",
          code: -1,
          data: {},
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: "Something went wrong! Please try again",
        code: -1,
        data: {},
      };
    }
  },
};
