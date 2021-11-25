const bankService = require("../Services/bankService");
const { validationResult } = require("express-validator");
const messageConstants = require("../constant/messageConstants");
const Paginator = require("../commons/paginator");

// Get All
exports.getAll = (req, res) => {
  bankService
    .getAll()
    .then((data) => {
      res.status(200).json({
        success: true,
        message: "Bank Founded",
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
  bankService
    .getallpaging(data)
    .then((data) => {
      const response = Paginator.getPagingData(data, page, limit);
      res.status(200).json({
        success: true,
        message: "Bank Founded",
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
  return bankService
    .getbyID(Id)
    .then((bank) => {
      if (bank === null) {
        res.status(404).json({
          message: "Bank Id Not Founded",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Bank Founded",
          data: bank,
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
exports.create = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const bank = {
      Name: req.body.Name,
      Address: req.body.Address,
      OpenTime: req.body.OpenTime,
      CloseTime: req.body.CloseTime,
      Phone: req.body.Phone,
      Type: req.body.Type,
      DistrictId: req.body.DistrictId,
      CategoryId: req.body.CategoryId,
    };
    bankService
      .create(bank)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "Bank Create Success",
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
    const bankUpdate = {
      Name: req.body.Name,
      Address: req.body.Address,
      OpenTime: req.body.OpenTime,
      CloseTime: req.body.CloseTime,
      Phone: req.body.Phone,
      Type: req.body.Type,
      DistrictId: req.body.DistrictId,
      categoryId: req.body.categoryId,
      UpdatedDate: Date(),
    };
    hospitalService
      .update(Id, bankUpdate)
      .then((result) => {
        if (result == 1) {
          res.status(200).json({
            success: true,
            message: "Bank Update Success",
            data: bankUpdate,
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
  return bankService
    .delete(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: "Bank Deleted",
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
  return bankService
    .restore(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: "Bank Restore Success",
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
