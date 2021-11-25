const ecommerceService = require("../Services/ecommerceService");
const { validationResult } = require("express-validator");
const messageConstants = require("../constant/messageConstants");
const Paginator = require("../commons/paginator");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const upload = require("../middlewares/uploads");

//Get all
exports.getAll = (req, res) => {
  ecommerceService
    .getAll()
    .then((data) => {
      res.status(200).json({
        success: true,
        message: messageConstants.ECOMMERCE_FOUND,
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

// Tạo
exports.create = async (req, res, next) => {
  try {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("log error", errros);
      res.status(422).json({ errors: errors.array() });
      return;
    }
    await upload(req, res);
    // console.log("log req", req);
    const file = req.files;
    console.log("log file", file);
    // for(i=0; i<file.length; i++){
    //   console.log("log for file",file[i].path);
    //   // const a = file[i].path;
    // }
    // console.log("log body", req.body.ImageUrl);
    file.forEach((item) => {
      console.log(item);
      item.uploadDir = "/upload/uploads/";
      console.log(item.path);
      let newPath = item.uploadDir + item.originalname;
      console.log("log new path", newPath);
      const ecommerce = {
        Name: req.body.Name,
        Description: req.body.Description,
        ImageUrl: newPath,
        Address: req.body.Address,
        Phone: req.body.Phone,
        Email: req.body.Email,
      };
      console.log(ecommerce);
      ecommerceService
        .create(ecommerce)
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

//get all paging
exports.getallpaging = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size);
  var condition = JSON.stringify(req.query) || null;
  const { limit, offset } = Paginator.getPagination(page, size);
  const data = { limit, offset, condition };
  await ecommerceService
    .getallpaging(data) 
    .then((data) => {
      const reponse = Paginator.getPagingData(data, page, limit);
      res.status(200).json({
        success: true,
        message: messageConstants.ECOMMERCE_FOUND,
        data: reponse,
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

//getbyid
exports.getById = (req, res) => {
  ecommerceService
    .getById(req.params.id)
    .then((ecommerce) => {
      if (ecommerce === null) {
        res.status(200).json({
          message: messageConstants.ECOMMERCE_FOUND,
        });
      } else {
        res.status(200).json({
          success: true,
          message: messageConstants.ECOMMERCE_NOT_FOUND,
          ecommerce: ecommerce,
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

//update
exports.update = async (req, res, next) => {
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
      console.log(item.path);
      let newPath = item.uploadDir + item.originalname;
      console.log("log new path", newPath);
      const Id = req.params.id;
      const ecommerceUpdate = {
        Name: req.body.Name,
        Description: req.body.Description,
        ImageUrl: newPath,
        Address: req.body.Address,
        Phone: req.body.Phone,
        Email: req.body.Email,
        UpdatedDate: Date(),
      };
      console.log(ecommerceUpdate);
      ecommerceService
        .update(Id, ecommerceUpdate)
        .then((result) => {
          if (result == 1) {
            res.status(200).json({
              success: true,
              message: messageConstants.ECOMMERCE_UPDATE_SUSSCESS,
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

//delete
exports.destroy = (req, res) => {
  const Id = req.params.id;
  ecommerceService
    .destroy(Id)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          result: result,
          message: messageConstants.ECOMMERCE_DELETED,
        });
      } else {
        res.status(400).json({
          message: result.message,
        });
      }
    })
    .catch((err) => {
      res.send({
        status: err.status || 500,
        message: err.message,
      });
    });
};

//soft delete
exports.delete = (req, res) => {
  const Id = req.params.id;
  const options = { field: "Deleted", Deleted: 1, UpdatedDate: Date() };
  ecommerceService
    .delete(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: messageConstants.ECOMMERCE_DELETED,
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
};

//restore
exports.restore = (req, res) => {
  const Id = req.params.id;
  const options = { field: "Deleted", Deleted: 0, UpdatedDate: Date() };
  ecommerceService
    .restore(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: messageConstants.ECOMMERCE_RESTORE_SUSSCESS,
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
};
