const categoryService = require("../services/categoryService");
const { validationResult } = require("express-validator");
const messageConstants = require("../constant/messageConstants");
const upload = require("../middlewares/uploads");


// Get products sort categories by id
exports.getProducts = (req, res) => {
  const Id = req.params.id;
  console.log(Id);
  categoryService.getProducts(Id).then(data=>{
    res.status(200).json({
      success: true,
    message:messageConstants.CATEGORIES_FOUND,
   Categories:data
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

// Get list products sort categories
exports.getListProducts = (req, res) => {
  categoryService.getListProducts().then(data=>{
    res.status(200).json({
      success: true,
    message:messageConstants.CATEGORIES_FOUND,
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

// Get All
exports.getAll = (req, res) => {
  categoryService
    .getAll()
    .then((data) => {
      res.status(200).json({
        success: true,
        message: messageConstants.CATEGORIES_FOUND,
        Categories: data,
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

// Get categories cuisine
exports.getAllCuisine = (req, res) => {
  categoryService
    .getAllCuisine()
    .then((data) => {
      res.status(200).json({
        success: true,
        message: messageConstants.CATEGORIES_FOUND,
        Categories: data,
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
  return categoryService
    .getbyID(Id)
    .then((category) => {
      if (category === null) {
        res.status(404).json({
          message: messageConstants.CATEGORIES_ID_NOT_FOUND,
        });
      } else {
        res.status(200).json({
          success: true,
          message: messageConstants.CATEGORIES_FOUND,
          category: category,
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
      const categories = {
        Name: req.body.Name,
        EcommerceId: req.body.EcommerceId,
        Description: req.body.Description,
        Content: req.body.Content,
        ParentId: req.body.ParentId,
        ImageUrl: newPath,
      };
      console.log(categories);
      categoryService
        .create(categories)
        .then((result) => {
          res.status(200).json({
            success: true,
            message: messageConstants.CATEGORIES_CREATE_SUSSCESS,
            Categories: result,
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
      const categoriesUpdate = {
        Name: req.body.Name,
        EcommerceId: req.body.EcommerceId,
        Description: req.body.Description,
        Content: req.body.Content,
        ParentId: req.body.ParentId,
        ImageUrl: newPath,
        UpdatedDate: Date(),
      };
      categoryService
        .update(Id, categoriesUpdate)
        .then((result) => {
          if (result == true) {
            res.status(200).json({
              success: true,
              message: messageConstants.CATEGORIES_UPDATE_SUSSCESS,
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
  return categoryService
    .delete(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: messageConstants.CATEGORIES_DELETED,
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
  categoryService
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
  const options = { field: "Deleted", Deleted: 0 };
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

//get bank by categories bank
exports.getListBank = (req, res) => {
  categoryService.getListBank()
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

//get bank by categories bank id
exports.getBank = (req, res) => {
  const Id = req.params.id;
  categoryService.getBank(Id)
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
