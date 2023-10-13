import postService from "../service/postService";

const checkUserPermission = (user, targetID) => {
  if (user.userID === +targetID || user.group === "admin") {
    return true;
  }
  return false;
};
const checkAdminPermission = (user) => {
  if (user.group === "admin") {
    return true;
  }
  return false;
};
const handleRes = function (res, isCheck, fn) {
  if (isCheck) {
    let result = fn;
    res.status(200).json({
      message: result.message,
      code: result.code,
      data: result.data,
    });
  } else {
    res.status(200).json({
      message: "you don't have permission!",
      code: -1,
      data: {},
    });
  }
};

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
    let author = req.user.userID;

    let result = await postService.create(req.body, author);

    res.status(200).json({
      message: result.message,
      code: result.code,
      data: result.data,
    });
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

  async getComment(req, res) {
    let id = req.params.id;

    let result = await postService.getComment(id);
    res.status(200).json({
      message: result.message,
      code: result.code,
      data: result.data,
    });
  },

  async handleUpdate(req, res) {
    let rawData = { ...req.body };
    let id = req.params.id;
    let post = await postService.getById(id);

    if (post.code === 1) {
      handleRes(
        res,
        checkUserPermission(req.user, post.data.userId),
        await postService.update(id, rawData)
      );
    } else {
      res.status(404).json({
        message: "can't not find post",
        code: -1,
        data: {},
      });
    }
  },

  async handleDelete(req, res) {
    let id = req.params.id;
    let post = await postService.getById(id);

    if (post.code === 1) {
      handleRes(
        res,
        checkUserPermission(req.user, post.data.userId),
        await postService.delete(id)
      );
    } else {
      res.status(404).json({
        message: "can't not find post",
        code: -1,
        data: {},
      });
    }
  },

  async handleDestroy(req, res) {
    let id = req.params.id;
    let post = await postService.getById(id);

    if (post.code === 1) {
      handleRes(
        res,
        checkUserPermission(req.user, post.data.userId),
        await postService.destroy(id)
      );
    } else {
      res.status(404).json({
        message: "can't not find post",
        code: -1,
        data: {},
      });
    }
  },

  async getTrash(req, res) {
    handleRes(res, checkAdminPermission(req.user), await postService.trash());
  },

  async handleRestore(req, res) {
    let id = req.params.id;

    let post = await postService.getDeleted(id);

    if (post.data.userId) {
      handleRes(
        res,
        checkUserPermission(req.user, post.data.userId),
        await postService.restore(id)
      );
    } else {
      res.status(404).json({
        message: "can't not find post",
        code: -1,
        data: {},
      });
    }
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

    handleRes(
      res,
      checkUserPermission(req.user, id),
      await postService.getUserPostTrash(id)
    );
  },

  create(req, res) {
    res.render("post/post");
  },
};
