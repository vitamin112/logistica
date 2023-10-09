import postService from "../service/postService";

module.exports = {
  async handleShow(req, res) {
    let postList = await postService.read();
    let trash = await postService.trash();
    if (postList) {
      res.render("post", { postList, path: "/post", trash });
    } else {
      res.send("No post found");
    }
  },

  async handleCreate(req, res) {
    let post = await postService.create(req.body);
    if (post) {
      res.redirect("/post");
    } else {
      res.send("No post found");
    }
  },

  create(req, res) {
    res.render("post/post");
  },
  async getById(req, res) {
    let id = req.params.id;
    let result = await postService.getById(id);
    res.status(200).json({
      message: result.message,
      code: result.code,
      data: result.data,
    });
  },
  async handleUpdate(req, res) {
    let rawData = { ...req.body };
    let id = rawData.body?.id || req.params.id;
    let result = await postService.update(id, rawData);
    res.status(200).json({
      message: result.message,
      code: result.code,
      data: result.data,
    });
  },

  async handleDelete(req, res) {
    let id = req.params.id;

    await postService.delete(id);
    res.redirect("/post");
  },
  async handleDestroy(req, res) {
    let id = req.params.id;

    await postService.delete(id);
    res.redirect("/post");
  },
  async getTrash(req, res) {
    let trash = await postService.trash();
    res.render("post/trash", { trash });
  },
  async handleRestore(req, res) {
    let id = req.params.id;
    let post = await postService.restore(id);
    if (post) {
      res.redirect("back");
    } else {
      res.send("false to restore!");
    }
  },
};
