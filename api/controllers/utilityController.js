const utilityService = require("../Services/utilityService");
const { validationResult } = require("express-validator");
const messageConstants = require("../constant/messageConstants");
const Paginator = require("../commons/paginator");
const upload = require("../middlewares/uploads");

// Get All
exports.getAll = (req, res) => {
  utilityService
    .getAll()
    .then((data) => {
      res.status(200).json({
        success: true,
        message: "Utility Founded",
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

// Get All by Paging
exports.getallpaging = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size);
  const { limit, offset } = Paginator.getPagination(page, size);
  const data = { limit, offset };
  utilityService
    .getallpaging(data)
    .then((data) => {
      const response = Paginator.getPagingData(data, page, limit);
      res.status(200).json({
        success: true,
        message: "Utility Founded",
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
  return utilityService
    .getbyID(Id)
    .then((utility) => {
      if (utility === null) {
        res.status(404).json({
          message: "Utility Id Not Founded",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Utility Founded",
          data: hospital,
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
    await upload(req,res);
    const file = req.files;
    file.forEach(item => {
      console.log(item);
      item.uploadDir = "/upload/uploads/";
      let newPath = item.uploadDir + item.originalname;
      console.log("log new path", newPath);
      const utility = {
        Name: req.body.Name,
        Address: req.body.Address,
        OpenTime: req.body.OpenTime,
        CloseTime: req.body.CloseTime,
        Phone: req.body.Phone,
        Type: req.body.Type,
        DistrictId: req.body.DistrictId,
        CategoryId: req.body.CategoryId,
        ImageUrl: newPath
      };
      utilityService
        .create(utility)
        .then((result) => {
          res.status(200).json({
            success: true,
            message: "Utility Create Success",
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
    const utilityUpdate = {
        Name: req.body.Name,
        Address: req.body.Address,
        OpenTime: req.body.OpenTime,
        CloseTime: req.body.CloseTime,
        Phone: req.body.Phone,
        Type: req.body.Type,
        WardId: req.body.WardId,
      UpdatedDate: Date(),
    };
    utilityService
      .update(Id, utilityUpdate)
      .then((result) => {
        if (result == 1) {
          res.status(200).json({
            success: true,
            message: "Utility Update Success",
            data: utilityUpdate,
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
  } catch (err) {
    return next(err);
  }
};

//Soft delete
exports.delete = function (req, res, next) {
  const Id = req.params.id;
  const options = { field: "Deleted", Deleted: 1, UpdatedDate: Date() };
  return utilityService
    .delete(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: "Utility Deleted",
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
  return utilityService
    .restore(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: "Utility Restore Success",
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

// Get by SOS
exports.getSOS = (req, res) => {
  utilityService
    .getSOS()
    .then((data) => {
      res.status(200).json({
        success: true,
        message: "Utility Founded",
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
