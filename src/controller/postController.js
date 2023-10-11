import postService from "../service/postService";

module.exports = {
  async handleShow(req, res) {
    let result = await postService.read();
    let trash = await postService.trash();

    res.status(200).json({
      message: result.message,
      code: result.code,
      data: { posts: result.data, trash },
    });
  },

  async handleCreate(req, res) {
    let result = await postService.create(req.body);

    res.status(200).json({
      message: result.message,
      code: result.code,
      data: result.data,
    });
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

    let result = await postService.delete(id);
    res.status(200).json({
      message: result.message,
      code: result.code,
      data: result.data,
    });
  },

  async handleDestroy(req, res) {
    let id = req.params.id;

    let result = await postService.destroy(id);

    res.status(200).json({
      message: result.message,
      code: result.code,
      data: result.data,
    });
  },

  async getTrash(req, res) {
    let result = await postService.trash();

    res.status(200).json({
      message: result.message,
      code: result.code,
      data: result.data,
    });
  },

  async handleRestore(req, res) {
    let id = req.params.id;
    let result = await postService.restore(id);

    res.status(200).json({
      message: result.message,
      code: result.code,
      data: result.data,
    });
  },

  async getUserPost(req, res) {
    let id = req.params.id;
    let result = await postService.getUserPost(id);

    res.status(200).json({
      message: result.message,
      code: result.code,
      data: result.data,
    });
  },

  async getUserPostTrash(req, res) {
    let id = req.params.id;

    let result = await postService.getUserPostTrash(id);

    res.status(200).json({
      message: result.message,
      code: result.code,
      data: result.data,
    });
  },
};
