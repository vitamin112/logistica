import projectService from "../service/projectService";

module.exports = {
  async handleShow(req, res) {
    let projectList = await projectService.read();
    let trash = await projectService.trash();
    if (projectList) {
      res.render("project", { projectList, path: "/project", trash });
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
  async handleDestroy(req, res) {
    let id = req.params.id;

    await projectService.delete(id);
    res.redirect("/project");
  },
  async getTrash(req, res) {
    let trash = await projectService.trash();
    res.render("project/trash", { trash });
  },
  async handleRestore(req, res) {
    let id = req.params.id;
    let project = await projectService.restore(id);
    if (project) {
      res.redirect("back");
    } else {
      res.send("false to restore!");
    }
  },
};
