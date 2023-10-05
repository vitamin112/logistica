import db from "../models";

const formattedDate = function (date) {
  const inputDate = new Date(date);
  const day = String(inputDate.getUTCDate()).padStart(2, "0");
  const month = String(inputDate.getUTCMonth() + 1).padStart(2, "0");
  const year = inputDate.getUTCFullYear();

  const formattedDate = `${day}-${month}-${year}`;
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
};
