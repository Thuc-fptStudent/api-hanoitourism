const BookingService = require("../services/BookingService");
const { validationResult } = require("express-validator");
const messageConstants = require("../constant/messageConstants");
const Paginator = require("../commons/paginator");
const userService = require("../services/userService");

// Get All
exports.get = (req, res) => {
  BookingService.get()
    .then((data) => {
      res.status(200).json({
        success: true,
        message: messageConstants.BOOKINGS_FOUND,
        Bookings: data,
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


// Get Type
exports.getType = (req, res) => {
  BookingService.getType(req.query)
    .then((data) => {
      res.status(200).json({
        success: true,
        message: messageConstants.BOOKINGS_FOUND,
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
  BookingService.getallpaging(data)
    .then((data) => {
      const response = Paginator.getPagingData(data, page, limit);
      res.status(200).json({
        success: true,
        message: messageConstants.BOOKINGS_FOUND,
        Bookings: response,
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

// Get Combine (Bookings have details's and products's information)
exports.getcombine = (req, res) => {
  BookingService.getcombine()
    .then((data) => {
      res.status(200).json({
        success: true,
        message: messageConstants.BOOKING_DETAILS_FOUND,
        Bookings: data,
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
  return BookingService.getbyID(Id)
    .then((booking) => {
      if (booking === null) {
        res.status(404).json({
          message: messageConstants.BOOKINGS_ID_NOT_FOUND,
        });
      } else {
        res.status(200).json({
          success: true,
          message: messageConstants.BOOKINGS_FOUND,
          booking: booking,
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
    const bookings = {
      userId: req.body.userId,
      EcommerceId: req.body.EcommerceId,
      StoreId: req.body.StoreId,
      StartDate: req.body.StartDate,
      Contact: req.body.Contact,
      Phone: req.body.Phone,
      Description: req.body.Description,
      EndDate: req.body.EndDate,
      Type: req.body.Type,
      eventId : req.body.eventId
    };
    BookingService.create(bookings)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: messageConstants.BOOKINGS_CREATE_SUSSCESS,
          Bookings: result,
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
    const bookingsUpdate = {
      userId: req.body.userId,
      EcommerceId: req.body.EcommerceId,
      StoreId: req.body.StoreId,
      StartDate: req.body.StartDate,
      Contact: req.body.Contact,
      Phone: req.body.Phone,
      Description: req.body.Description,
      UpdatedBy: req.body.UpdatedBy,
      UpdatedDate: Date(),
    };
    BookingService.update(Id, bookingsUpdate)
      .then((result) => {
        if (result == 1) {
          res.status(200).json({
            success: true,
            message: messageConstants.BOOKINGS_UPDATE_SUSSCESS,
            BookingsUpdate: bookingsUpdate,
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
// // Delete
exports.destroy = function (req, res) {
  const Id = req.params.id;
  return BookingService.destroy(Id)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: messageConstants.BOOKINGS_DELETED,
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
  return BookingService.delete(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: messageConstants.BOOKINGS_DELETED,
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
  return categoryService
    .restore(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: messageConstants.CATEGORIES_RESTORE_SUSSCESS,
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
