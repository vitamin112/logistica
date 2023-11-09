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
    let postList = await db.post.findAll({
      include: [
        {
          model: db.user,
          attributes: ["userName", "id"],
        },
      ],
    });

    return { message: "success", code: 1, data: postList };
  },

  async getUserPost(id) {
    let { count, rows } = await db.post.findAndCountAll({
      where: { userId: id },
    });

    if (count) {
      return { message: "success", code: 1, data: { count, rows } };
    }
    return {
      message: "This user don't have any post!",
      code: 1,
      data: postList,
    };
  },

  async getUserPostTrash(id) {
    const { count, rows } = await db.post.findAndCountAll({
      paranoid: false,
      where: { deletedAt: { [Op.not]: null }, userId: id },
    });

    if (count) {
      return { message: "success", code: 1, data: { count, rows } };
    }
    return {
      message: "Nothing here!",
      code: 1,
      data: {},
    };
  },

  async getById(id) {
    let post = await db.post.findOne({
      where: { id },
      include: [
        {
          model: db.user,
          attributes: ["userName", "id"],
        },
        {
          model: db.comment,
          include: {
            model: db.user,
            attributes: ["userName", "id"],
          },
        },
      ],
    });
    if (post) {
      return {
        message: "Success",
        code: 1,
        data: { post },
      };
    } else {
      return {
        message: "can't find post",
        code: -1,
        data: {},
      };
    }
  },

  async getComment(id) {
    const { count, rows } = await db.comment.findAndCountAll({
      where: { postId: id },
      raw: true,
    });
    if (count) {
      return {
        message: "Success",
        code: 1,
        data: { count, rows },
      };
    } else {
      return {
        message: "can't find any comment here!",
        code: -1,
        data: {},
      };
    }
  },

  async getDeleted(id) {
    let post = await db.post.findByPk(id, { paranoid: false });
    if (post) {
      return {
        message: "Success",
        code: 1,
        data: post,
      };
    } else {
      return {
        message: "can't find post",
        code: -1,
        data: {},
      };
    }
  },

  async create(rawData, author) {
    rawData.userId = author;

    let post = await db.post.create(rawData);

    return {
      message: "A Post created",
      code: 1,
      data: post._previousDataValues,
    };
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

    if (post) {
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
      let post = await db.post.destroy({
        where: {
          id,
        },
        force: true,
      });
      if (post) {
        return {
          message: "Success",
          code: 1,
          data: { post },
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
      const { count, rows } = await db.post.findAndCountAll({
        paranoid: false,
        where: { deletedAt: { [Op.not]: null } },
      });
      if (count) {
        return {
          message: "success",
          code: 1,
          data: { count, rows },
        };
      } else {
        return {
          message: "nothing here!",
          code: 1,
          data: {},
        };
      }
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
      let post = await db.post.findByPk(id, { paranoid: false });

      if (post) {
        let result = await post.restore();
        return {
          message: "success",
          code: 1,
          data: { ...result.dataValues },
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

  async search(searchTerm) {
    try {
      let posts = await db.post.findAll({
        raw: true,
        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${searchTerm}%`,
              },
            },
            {
              content: {
                [Op.like]: `%${searchTerm}%`,
              },
            },
          ],
        },
      });
      if (posts) {
        return {
          message: "success",
          code: 1,
          data: { posts },
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
};
