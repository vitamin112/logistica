import commentService from "../service/commentService";

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
    let id = req.params.id;

    let result = await commentService.getComment(id);

    res.status(200).json({
      message: result.message,
      code: result.code,
      data: { ...result.data },
    });
  },

  async handleCreate(req, res) {
    let author = req.user.userID;
    let postId = req.params.id;
    req.body.userId = author;
    req.body.postId = postId;

    let result = await commentService.create(req.body);

    res.status(200).json({
      message: result.message,
      code: result.code,
      data: result.data,
    });
  },

  async handleUpdate(req, res) {
    let rawData = { ...req.body };
    let cmtId = req.params.cmtId;
    let comment = await commentService.getById(cmtId);

    if (comment.code === 1) {
      handleRes(
        res,
        checkUserPermission(req.user, comment.data.userId),
        await commentService.update(id, rawData)
      );
    } else {
      res.status(404).json({
        message: "can't not find comment",
        code: -1,
        data: {},
      });
    }
  },

  async handleDestroy(req, res) {
    let id = req.params.cmtId;
    let comment = await commentService.getById(id);

    if (comment.code === 1) {
      handleRes(
        res,
        checkUserPermission(req.user, comment.data.userId),
        await commentService.destroy(id)
      );
    } else {
      res.status(404).json({
        message: "can't not find comment",
        code: -1,
        data: {},
      });
    }
  },
};
