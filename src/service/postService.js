import { Op } from "sequelize";
import db from "../models";

const formattedDate = function (date) {
  const inputDate = new Date(date);
  const day = String(inputDate.getUTCDate()).padStart(2, "0");
  const month = String(inputDate.getUTCMonth() + 1).padStart(2, "0");
  const year = inputDate.getUTCFullYear();

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

module.exports = {
  async read() {
    let postList = await db.post.findAll();

    let formattedList = postList.map((item) => {
      item.startDate = formattedDate(item.startDate);

      return item;
    });

    return formattedList;
  },

  async getById(id) {
    let post = await db.post.findOne({ where: { id }, raw: true });
    // post.startDate = formattedDate(post.startDate);
    return {
      message: "Success",
      code: 1,
      data: post,
    };
  },

  async create(rawData) {
    let post = await db.post.create(rawData);
    return post;
  },

  async update(id, data) {
    let post = await db.post.update(data, { where: { id } });

    if (post[0]) {
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
    let post = await db.post.destroy({ where: { id } });
    return post;
  },
  async destroy(id) {
    try {
      let post = await db.post.destroy({
        where: {
          id,
        },
        force: true,
      });
      return post;
    } catch (e) {
      console.log("Error: ", e);
      return;
    }
  },
  async trash() {
    try {
      const { count, rows } = await db.post.findAndCountAll({
        paranoid: false,
        where: { deletedAt: { [Op.not]: null } },
      });
      return { count, rows };
    } catch (e) {
      console.log("Error: ", e);
      return;
    }
  },
  async restore(id) {
    try {
      let post = await db.post.findByPk(id, { paranoid: false });
      if (post) {
        await post.restore();
        return post;
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  },
};
