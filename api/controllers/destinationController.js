const desService = require("../Services/destinationService");
const { validationResult } = require("express-validator");
const upload = require("../middlewares/uploads");
const messageConstants = require("../constant/messageConstants");
const Paginator = require("../commons/paginator");

//get all
exports.getAll = (req, res) => {
  desService
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
  desService
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
  return desService
    .getByid(Id)
    .then((destination) => {
      if (destination === null) {
        res.status(404).json({
          message: destination.message,
        });
      } else {
        res.status(200).json({
          success: true,
          data: destination,
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
      const destination = {
        Name: req.body.Name,
        ImageUrl: newPath,
        Content: req.body.Content,
        Location: req.body.Location,
        Price: req.body.Price,
        Description: req.body.Description,
      };
      console.log(destination);
      desService
        .create(destination)
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
      const desUpdate = {
        Name: req.body.Name,
        ImageUrl: newPath,
        Content: req.body.Content,
        Location: req.body.Location,
        Service: req.body.Service,
        Price: req.body.Price,
        Description: req.body.Description,
        UpdatedDate: Date(),
      };
      desService
        .update(Id, desUpdate)
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
  return desService
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
// // Delete
exports.destroy = function (req, res) {
  const Id = req.params.id;
  desService
    .destroy(Id)
    .then((result) => {
      if (result === null) {
        res.status(404).json({
          message: messageConstants.CATEGORIES_NOT_FOUND,
        });
      } else {
        res.status(200).json({
          success: true,
          message: messageConstants.CATEGORIES_DELETED,
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
  return desService
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

// Get products sort categories by id
exports.getService = (req, res) => {
  const Id = req.params.id;
  console.log(Id);
  desService
    .getService(Id)
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

// Get list products sort categories
exports.getListService = (req, res) => {
  desService
    .getListService()
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

//get image
exports.getImage = (req, res) => {
  desService
    .getImage()
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

//get images by id
exports.getImageId = (req, res) => {
  const Id = req.params.id;
  console.log(Id);
  desService.getImageId(Id).then(data=>{
    res.status(200).json({
      success: true,
   data:data
     });
}).catch(err =>{
  res.send({
    error:{
      status: err.status ||500,
      message: err.message
    },
  })
});
};

//get store
exports.getStore = (req, res) => {
  desService
    .getStore()
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

//get store by id
exports.getStoreId = (req, res) => {
  const Id = req.params.id;
  console.log(Id);
  desService.getStoreId(Id).then(data=>{
    res.status(200).json({
      success: true,
   data:data
     });
}).catch(err =>{
  res.send({
    error:{
      status: err.status ||500,
      message: err.message
    },
  })
});
};


