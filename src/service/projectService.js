import db from "../models";
module.exports = {
  async read() {
    let projectList = await db.project.findAll();
    return projectList;
  },
  async create(rawData) {
    let project = await db.project.create(rawData);
    return project;
  },
};
