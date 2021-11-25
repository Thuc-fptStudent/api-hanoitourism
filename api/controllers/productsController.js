const productService = require("../services/productService");
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
    file.forEach((item) => {
      item.uploadDir = "/upload/uploads/";
      let newPath = item.uploadDir + item.originalname;
      console.log("log new path", newPath);
      const product = {
        Name: req.body.Name,
        Description: req.body.Description,
        Content: req.body.Content,
        categoryId: req.body.categoryId,
        StoreId: req.body.StoreId,
        ParentId: req.body.ParentId,
        ImageUrl: newPath,
        Price: req.body.Price,
      };
      productService
        .create(product)
        .then((result) => {
          res.status(200).json({
            success: true,
            message: messageConstants.PRODUCT_CREATE_SUSSCESS,
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
// Get All with Paging
exports.getallpaging = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size);
  var condition = JSON.stringify(req.query) || null;
  const { limit, offset } = Paginator.getPagination(page, size);
  const data = { limit, offset, condition };
  productService
    .getallpaging(data)
    .then((data) => {
      const response = Paginator.getPagingData(data, page, limit);
      res.status(200).json({
        success: true,
        message: messageConstants.PRODUCT_FOUND,
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
exports.get = (req, res) => {
  productService
    .get()
    .then((data) => {
      res.status(200).json({
        success: true,
        message: messageConstants.PRODUCT_FOUND,
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
  productService
    .getbyID(Id)
    .then((product) => {
      if (product === null) {
        res.status(200).json({
          message: messageConstants.PRODUCT_ID_NOT_EXIST,
        });
      } else {
        res.status(200).json({
          success: true,
          message: messageConstants.PRODUCT_FOUND,
          data: product,
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
      const productUpdate = {
        Name: req.body.Name,
        Description: req.body.Description,
        Content: req.body.Content,
        ImageUrl: newPath,
        CategoryId: req.body.CategoryId,
        ParentId: req.body.ParentId,
        Price: req.body.Price,
        UpdatedDate: Date(),
      };
      productService
        .update(Id, productUpdate)
        .then((result) => {
          if (result == true) {
            res.status(200).json({
              success: true,
              message: messageConstants.PRODUCT_UPDATE_SUSSCESS,
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
exports.destroy = function (req, res) {
  const Id = req.params.id;
  productService
    .destroy(Id)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: messageConstants.PRODUCT_DELETED,
        status: result,
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
//Soft delete
exports.delete = function (req, res, next) {
  const Id = req.params.id;
  const options = { field: "Deleted", Deleted: 1, UpdatedDate: Date() };
  productService
    .delete(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: messageConstants.PRODUCT_DELETED,
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
  productService
    .restore(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: messageConstants.PRODUCT_RESTORE_SUSSCESS,
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

//get cate
exports.getCate = (req, res) => {
  productService
    .getCate()
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