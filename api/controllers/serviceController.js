const serService = require("../Services/serviceService");
const { validationResult } = require("express-validator");
const upload = require("../middlewares/uploads");
const messageConstants = require("../constant/messageConstants");
const Paginator = require("../commons/paginator");

//get all
exports.getAll = (req, res) => {
  serService
    .getAll()
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

// Get All with Paging
exports.getallpaging = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size);
  var condition = JSON.stringify(req.query) || null;
  const { limit, offset } = Paginator.getPagination(page, size);
  const data = { limit, offset, condition };
  serService
    .getAllPaging(data)
    .then((data) => {
      const response = Paginator.getPagingData(data, page, limit);
      res.status(200).json({
        success: true,
        message: data.message,
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

//get by id
// GetbyID
exports.getbyID = function (req, res) {
  const Id = req.params.id;
  return serService
    .getByid(Id)
    .then((service) => {
      if (service === null) {
        res.status(404).json({
          message: service.message,
        });
      } else {
        res.status(200).json({
          success: true,
          data: service,
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
    console.log("log file", file);
    file.forEach((item) => {
      item.uploadDir = "/upload/uploads/";
      let newPath = item.uploadDir + item.originalname;
      console.log("log new path", newPath);
      const service = {
        Name: req.body.Name,
        ImageUrl: newPath,
      };
      console.log(service);
      serService
        .create(service)
        .then((result) => {
          res.status(200).json({
            success: true,
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
      const serUpdate = {
        Name: req.body.Name,
        ImageUrl: newPath,
        UpdatedDate: Date(),
      };
      serService
        .update(Id, serUpdate)
        .then((result) => {
          if (result == true) {
            res.status(200).json({
              success: true,
              message: result.message,
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
    });
  } catch (err) {
    return next(err);
  }
};
//Soft delete
exports.delete = function (req, res, next) {
  const Id = req.params.id;
  const options = { field: "Deleted", Deleted: 1, UpdatedDate: Date() };
  return serService
    .delete(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: result.message,
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
// Restore
exports.restore = function (req, res) {
  const Id = req.params.id;
  const options = { field: "Deleted", Deleted: 0, UpdatedDate: Date() };
  return serService
    .restore(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: result.message,
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
