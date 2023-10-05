import projectService from "../service/projectService";

module.exports = {
  async handleShow(req, res) {
    let projectList = await projectService.read();
    if (projectList) {
      res.render("project", { projectList });
    } else {
      res.send("No project found");
    }
  },

  async handleCreate(req, res) {
    let project = await projectService.create(req.body);
    if (project) {
      res.redirect("/project");
    } else {
      res.send("No project found");
    }
  },

  create(req, res) {
    res.render("project/project");
  },
  async update(req, res) {
    let id = req.params.id;
    let project = await projectService.getById(id);
    res.render("project/update", { project });
  },
  async handleUpdate(req, res) {
    let rawData = { ...req.body };

    await projectService.update(rawData);
    res.redirect("/project");
  },

  async handleDelete(req, res) {
    let id = req.params.id;

    await projectService.delete(id);
    res.redirect("/project");
  },
};
