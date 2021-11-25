const newService = require("../services/newService");
const { validationResult } = require("express-validator");
const messageConstants = require("../constant/messageConstants");
const Paginator = require("../commons/paginator");
const upload = require("../middlewares/uploads");

// Get All
exports.get = async (req, res) => {
  newService
    .get()
    .then((result) => {
      res.status(200).json({
        success: true,
        message: messageConstants.NEWS_FOUND,
        data: result,
      });
    })
    .catch((err) => {
      res.send({
        error: {
          status: err.status || 500,
          message: err.message,
        },
      });
    });
};

// Get All By Paging
exports.getallpaging = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size);
  const { limit, offset } = await Paginator.getPagination(page, size);
  const data = { limit, offset };
  newService
    .getallpaging(data)
    .then((result) => {
      const response = Paginator.getPagingData(result, page, limit);
      res.status(200).json({
        success: true,
        message: messageConstants.NEWS_FOUND,
        data: response,
      });
    })
    .catch((err) => {
      res.send({
        error: {
          status: err.status || 500,
          message: err.message,
        },
      });
    });
};

// GetbyID
exports.getbyID = function (req, res) {
  const Id = req.params.id;
  newService
    .getbyID(Id)
    .then((news) => {
      if (news === null) {
        res.status(200).json({
          message: messageConstants.NEWS_ID_NOT_FOUND,
        });
      } else {
        res.status(200).json({
          success: true,
          message: messageConstants.NEWS_FOUND,
          news: news,
        });
      }
    })
    .catch((err) => {
      res.send({
        error: {
          status: err.status || 500,
          message: err.message,
        },
      });
    });
};

// Create
exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    await upload(req, res);
    const file = req.files;
    file.forEach((item) => {
      item.uploadDir = "/upload/uploads/";
      let newPath = item.uploadDir + item.originalname;
      console.log("log new path", newPath);
      const news = {
        Name: req.body.Name,
        Description: req.body.Description,
        Content: req.body.Content,
        ImageUrl: newPath,
        EcommerceId: req.body.EcommerceId,
      };
      return newService
        .create(news)
        .then((result) => {
          res.status(200).json({
            success: true,
            message: messageConstants.NEWS_CREATE_SUSSCESS,
            data: result,
          });
        })
        .catch((err) => {
          res.send({
            error: {
              status: err.status || 500,
              message: err.message,
            },
          });
        });
    });
  } catch (err) {
    return next(err);
  }
};

// Update
exports.update = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const Id = req.params.id;
    const newsUpdate = {
      Name: req.body.Name,
      Description: req.body.Description,
      Content: req.body.Content,
      ImageUrl: req.body.ImageUrl,
      EcommerceId: req.body.EcommerceId,
      UpdatedBy: req.body.UpdatedBy,
      UpdatedDate: Date(),
    };
    newService
      .update(Id, newsUpdate)
      .then((result) => {
        if (result == true) {
          res.status(200).json({
            success: true,
            message: messageConstants.NEWS_UPDATE_SUSSCESS,
            newsUpdate: newsUpdate,
          });
        } else {
          res.status(500).json({
            message: result.message,
          });
        }
      })
      .catch((err) => {
        res.send({
          error: {
            status: err.status || 500,
            message: err.message,
          },
        });
      });
  } catch (err) {
    return next(err);
  }
};

// // Delete
exports.destroy = function (req, res) {
  const Id = req.params.id;
  newService
    .destroy(Id)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: messageConstants.NEWS_DELETED,
        });
      } else {
        res.status(404).json({
          message: result.message,
        });
      }
    })
    .catch((err) => {
      res.send({
        error: {
          status: err.status || 500,
          message: err.message,
        },
      });
    });
};
//Soft delete
exports.delete = function (req, res, next) {
  const Id = req.params.id;
  const options = { field: "Deleted", Deleted: 1, UpdatedDate: Date() };
  newService
    .delete(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: messageConstants.NEWS_DELETED,
        });
      } else {
        res.status(500).json({
          message: result.message,
        });
      }
    })
    .catch((err) => {
      res.json({
        error: {
          status: err.status || 500,
          message: err.message,
        },
      });
    });
};
// Restore
exports.restore = function (req, res) {
  const Id = req.params.id;
  const options = { field: "Deleted", Deleted: 0, UpdatedDate: Date() };
  newService
    .restore(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: messageConstants.NEWS_RESTORE_SUSSCESS,
        });
      } else {
        res.status(404).json({
          message: result.message,
        });
      }
    })
    .catch((err) => {
      res.send({
        error: {
          status: err.status || 500,
          message: err.message,
        },
      });
    });
};
