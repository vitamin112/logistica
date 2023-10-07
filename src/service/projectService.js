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
    let projectList = await db.project.findAll();

    let formattedList = projectList.map((item) => {
      item.startDate = formattedDate(item.startDate);

      return item;
    });

    return formattedList;
  },

  async getById(id) {
    let project = await db.project.findOne({ where: { id } });

    project.startDate = formattedDate(project.startDate);
    console.log(project.startDate);
    return project;
  },

  async create(rawData) {
    let project = await db.project.create(rawData);
    return project;
  },

  async update(data) {
    let project = await db.project.update(data, { where: { id: data.id } });

    return project;
  },

  async delete(id) {
    let project = await db.project.destroy({ where: { id } });
    return project;
  },
  async destroy(id) {
    try {
      let project = await db.project.destroy({
        where: {
          id,
        },
        force: true,
      });
      return project;
    } catch (e) {
      console.log("Error: ", e);
      return;
    }
  },
  async trash() {
    try {
      const { count, rows } = await db.project.findAndCountAll({
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
      let project = await db.project.findByPk(id, { paranoid: false });
      if (project) {
        await project.restore();
        return project;
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  },
};
