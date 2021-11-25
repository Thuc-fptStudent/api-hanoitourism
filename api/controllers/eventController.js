const eventService = require("../Services/eventService");
const { validationResult } = require("express-validator");
const messageConstants = require("../constant/messageConstants");
const Paginator = require("../commons/paginator");
const upload = require("../middlewares/uploads");

//Get all
exports.getAll = (req, res) => {
  eventService
    .getAll()
    .then((data) => {
      res.status(200).json({
        success: true,
        message: "Event Founded",
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
    const event = {
      Name: req.body.Name,
      EcommerceId: req.body.EcommerceId,
      CustomerId: req.body.CustomerId,
      Cost: req.body.Cost,
      StartTime: req.body.StartTime,
      EndTime: req.body.EndTime,
      Description: req.body.Description,
    };
    console.log(event);
    eventService
      .create(event)
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
  await eventService
    .getallpaging(data)
    .then((data) => {
      const reponse = Paginator.getPagingData(data, page, limit);
      res.status(200).json({
        success: true,
        message: "Event Founded",
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
  eventService
    .getById(req.params.id)
    .then((event) => {
      if (event === null) {
        res.status(200).json({
          message: "Event Not Founded",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Event Founded",
          ecommerce: event,
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
    const eventUpdate = {
      Name: req.body.Name,
      EcommerceId: req.body.EcommerceId,
      CustomerId: req.body.CustomerId,
      Cost: req.body.Cost,
      StartTime: req.body.StartTime,
      EndTime: req.body.EndTime,
      Description: req.body.Description,
      UpdatedDate: Date(),
    };
    console.log(eventUpdate);
    eventService
      .update(Id, eventUpdate)
      .then((result) => {
        if (result == 1) {
          res.status(200).json({
            success: true,
            message: "Event Update Success",
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

//soft delete
exports.delete = (req, res) => {
  const Id = req.params.id;
  const options = { field: "Deleted", Deleted: 1, UpdatedDate: Date() };
  eventService
    .delete(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: "Event Deleted",
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
  eventService
    .restore(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: "Event Restore Success",
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

//get image by event
exports.getListImage = (req, res) => {
  eventService
    .getListImage()
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
//get news id
exports.getImage = (req, res) => {
  const Id = req.params.id;
  console.log(Id);
  eventService
    .getImage(Id)
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
