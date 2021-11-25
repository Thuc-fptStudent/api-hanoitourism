const imageService = require("../Services/imageService");
const { validationResult } = require("express-validator");
const messageConstants = require("../constant/messageConstants");
const Paginator = require("../commons/paginator");
const upload = require("../middlewares/uploads");
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
    console.log(file);
    file.forEach((item) => {
      item.uploadDir = "/upload/uploads/";
      let newPath = item.uploadDir + item.originalname;
      console.log("log new path", newPath);
      const image = {
        Type: req.body.Type,
        ImageUrl: newPath,
        storeId: req.body.storeId,
        utilityId: req.body.utilityId,
        eventId: req.body.eventId
      };
      console.log(image);
      imageService
        .create(image)
        .then((result) => {
          res.status(200).json({
            success: true,
            data: result,
          });
        })
        .catch((err) => {
          return res.send({
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
// Get All with Paging
exports.getallpaging = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size);
  var condition = JSON.stringify(req.query) || null;
  const { limit, offset } = Paginator.getPagination(page, size);
  const data = { limit, offset, condition };
  imageService
    .getallpaging(data)
    .then((data) => {
      const response = Paginator.getPagingData(data, page, limit);
      res.status(200).json({
        success: true,
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

// Get All
exports.getAll = (req, res) => {
  imageService.get()
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
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
  imageService
    .getbyID(Id)
    .then((image) => {
      if (image === null) {
        res.status(200).json({
          message: image.message,
        });
      } else {
        res.status(200).json({
          success: true,
          data: image,
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

// Update
exports.update = async (req, res, next) => {
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
      console.log(item.path);
      let newPath = item.uploadDir + item.originalname;
      console.log("log new path", newPath);
      const Id = req.params.id;
      const imageUpdate = {
        Type: req.body.Type,
        ImageUrl: newPath,
        storeId: req.body.storeId,
        utilityId: req.body.utilityId,
        UpdatedDate: Date(),
      };
      imageService
        .update(Id, imageUpdate)
        .then((result) => {
          if (result == true) {
            res.status(200).json({
              success: true,
              message: result.message,
            });
          } else {
            res.status(200).json({
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
    });
  } catch (err) {
    return next(err);
  }
};
// Delete
// exports.destroy = function (req, res) {
//   const Id = req.params.id;
//   productService
//     .destroy(Id)
//     .then((result) => {
//       res.status(200).json({
//         success: true,
//         message: messageConstants.PRODUCT_DELETED,
//         status: result,
//       });
//     })
//     .catch((err) => {
//       res.send({
//         error: {
//           status: err.status || 500,
//           message: err.message,
//         },
//       });
//     });
// };
//Soft delete
exports.delete = function (req, res, next) {
  const Id = req.params.id;
  const options = { field: "Deleted", Deleted: 1, UpdatedDate: Date() };
  imageService
    .delete(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: "Deleted Founded",
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
  imageService
    .restore(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: "Restore Success",
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
