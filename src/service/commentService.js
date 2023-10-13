import db from "../models";
const { Op } = require("sequelize");

module.exports = {
  async create(data) {
    try {
      if (data.content == undefined || data.content === "") {
        return {
          message: "you must to write a content",
          code: -1,
          data: {},
        };
      } else {
        let newComment = await db.comment.create(data);
        return {
          message: "success",
          code: 1,
          data: { comment: newComment.dataValues },
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

  async update(id, data) {
    let comment = await db.comment.update(data, { where: { id } });

    if (comment[0]) {
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

  async destroy(id) {
    try {
      let comment = await db.comment.destroy({
        where: {
          id,
        },
        force: true,
      });
      if (comment) {
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
    } catch (e) {
      console.log("Error: ", e);
      return {
        message: "some thing went wrong! please try again",
        code: -1,
        data: {},
      };
    }
  },

  async getComment(id) {
    const { count, rows } = await db.comment.findAndCountAll({
      where: { postId: id },
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

  async getById(id) {
    let comment = await db.comment.findOne({ where: { id } });

    if (comment) {
      return {
        message: "success",
        code: 1,
        data: comment,
      };
    } else {
      return {
        message: "can't find comment",
        code: -1,
        data: {},
      };
    }
  },

  async getPagination({ page, limit }) {
    try {
      let { count, rows } = await db.comment.findAndCountAll({
        offset: page * limit,
        limit: limit,
      });
      return {
        commentList: rows,
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
