const orderDetailService = require("../services/orderDetailService");
const { validationResult } = require("express-validator");
const messageConstants = require("../constant/messageConstants");
const Paginator = require("../commons/paginator");

exports.getPagingFilter = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.zise);
  const OrderId = req.params.OrderId;
  const { limit, offset } = Paginator.getPagination(page, size);
  const data = { limit, offset, OrderId };
  orderDetailService
    .getPagingFilter(data)
    .then(async (result) => {
      const response = Paginator.getPagingData(result, page, limit);
      res.status(200).json({
        success: true,
        message: messageConstants.ORDER_DETAILS_FOUND,
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

// Get All By Paging
exports.getallpaging = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.zise);
  const { limit, offset } = Paginator.getPagination(page, size);
  const data = { limit, offset };
  await orderDetailService
    .getallpaging(data)
    .then((result) => {
      const response = Paginator.getPagingData(result, page, limit);
      res.status(200).json({
        success: true,
        message: messageConstants.ORDER_DETAILS_FOUND,
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
exports.get = async (req, res) => {
  await orderDetailService
    .get()
    .then((result) => {
      res.status(200).json({
        success: true,
        message: messageConstants.ORDER_DETAILS_FOUND,
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

// GetbyID
exports.getbyID = function (req, res) {
  const Id = req.params.id;
  orderDetailService
    .getbyID(Id)
    .then((order) => {
      if (order === null) {
        res.status(200).json({
          message: messageConstants.ORDER_DETAILS_ID_NOT_FOUND,
        });
      } else {
        res.status(200).json({
          success: true,
          message: messageConstants.ORDER_DETAILS_FOUND,
          order_detail: order,
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

// create
exports.create = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const order_details = {
      OrderId: req.body.OrderId,
      ProductId: req.body.ProductId,
      Price: req.body.Price,
      Content: req.body.Content,
      CreatedBy: req.body.CreatedBy,
      Status: 1,
      Deleted: 0,
    };
    orderDetailService
      .create(order_details)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: messageConstants.ORDER_DETAILS_CREATE_SUSSCESS,
          order: result,
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
    const detailUpdate = {
      OrderId: req.body.OrderId,
      ProductId: req.body.ProductId,
      Price: req.body.Price,
      Content: req.body.Content,
      UpdatedBy: req.body.UpdatedBy,
      UpdatedDate: Date(),
    };
    orderDetailService
      .update(Id, detailUpdate)
      .then((result) => {
        if (result == true) {
          res.status(200).json({
            success: true,
            message: messageConstants.ORDER_DETAILS_UPDATE_SUSSCESS,
            detailUpdate: detailUpdate,
          });
        } else {
          res.status(200).json({
            message: messageConstants.ORDER_DETAILS_UPDATE_FAIL,
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
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const Id = req.params.id;
    const options = { field: "Deleted", Deleted: 1, UpdatedDate: Date() };
    orderDetailService
      .delete(Id, options)
      .then((result) => {
        if (result == true) {
          res.status(200).json({
            success: true,
            message: messageConstants.ORDER_DETAILS_DELETED,
          });
        } else {
          res.status(500).json({
            message: messageConstants.ORDER_DETAILS_DELETE_FAIL,
            messageError: result.message,
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
  } catch (err) {
    return next(err);
  }
};

// // Delete
exports.destroy = function (req, res) {
  const Id = req.params.id;
  return orderDetailService
    .destroy(Id)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: messageConstants.ORDER_DETAILS_DELETED,
        });
      } else {
        res.status(404).json({
          message: messageConstants.ORDER_DETAILS_DELETE_FAIL,
          messageError: result.message,
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
  orderDetailService
    .restore(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: messageConstants.ORDER_DETAILS_RESTORE_SUSSCESS,
        });
      } else {
        res.status(404).json({
          message: messageConstants.ORDER_DETAILS_RESTORE_FAIL,
          messageError: result.message,
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
