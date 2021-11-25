const assessService = require("../Services/assessService");
const { validationResult } = require("express-validator");
const messageConstants = require("../constant/messageConstants");
const Paginator = require("../commons/paginator");
const upload = require("../middlewares/uploads");
const models = require("../../models");
const upload2 = require("../middlewares/upload");

// Get All
exports.getAll = (req, res) => {
  assessService
    .getAll()
    .then((data) => {
      res.status(200).json({
        success: true,
        message: "Assess Founded",
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
  assessService
    .getallpaging(data)
    .then((data) => {
      const response = Paginator.getPagingData(data, page, limit);
      res.status(200).json({
        success: true,
        message: "Assess Founded",
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
  return assessService
    .getbyID(Id)
    .then((assess) => {
      if (assess === null) {
        res.status(404).json({
          message: "Assess Id Not Founded",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Assess Founded",
          data: assess,
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

// // Create
exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    console.log("req",req);
    console.log("log body", req.body);
    await upload(req, res);
    const file = req.files;
    console.log("log file", file);
    file.forEach((item) => {
      //   console.log("log path",item.path);
      //   const url = item.path.replace("file:///storage/emulated/0/Android/data/com.hanoitourism/files/Pictures","");
      item.uploadDir = "/upload/uploads/";
      let newPath = item.uploadDir + item.originalname;
      console.log("log new path", newPath);
      const assess = {
        userId: req.body.userId,
        Description: req.body.Description,
        ImageUrl: newPath,
        Type: req.body.Type,
      };
      console.log(assess);
      assessService.create(assess);
      // .then((result) => {
      //   res.status(200).json({
      //     success: true,
      //     message: "Assess Create Success",
      //     data: result,
      //   });
      // })
      // .catch((err) => {
      //   res.send({
      //     error: {
      //       status: err.status || 500,
      //       message: err.message,
      //     },
      //   });
      // });
    });
    // const assess = {
    //   userId: req.body.userId,
    //   Description: req.body.Description,
    //   ImageUrl: null,
    //   Type: req.body.Type,
    // };
    // console.log(assess);
    // assessService.create(assess).then((result) => {
    //   return res.status(200).json({
    //     success: true,
    //     data: result,
    //   });
    // });
  } catch (err) {
    return next(err);
  }
};

// Create
// exports.create = async (req, res, next) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.status(422).json({ errors: errors.array() });
//       return;
//     }
//     const transaction = await models.sequelize.transaction();
//     try {
//       const assess = await models.assess.create(
//         {
//           userId: req.body.userId,
//           Description: req.body.Description,
//           ImageUrl: newPath,
//           Type: req.body.Type,
//         },
//         {
//           transaction,
//         }
//       );
//       console.log(assess);
//       await upload(req, res);
//       const file = req.files;
//       console.log(file);
//       file.forEach(async (item) => {
//         item.uploadDir = "/upload/uploads/";
//         let newPath = item.uploadDir + item.originalname;
//         console.log("log new path", newPath);
//         const images = await models.image.create(
//           {
//             AssessId: assess.Id,
//             Type: req.body.Type,
//             ImageUrl: newPath,
//           },
//           {
//             transaction,
//           }
//         );
//         await transaction.commit();
//       });
//       console.log(assess.Id);
//       //   const result = await orderService.getOderDetails(oders.Id);
//       //   console.log(result);
//       //   res.status(200).json({
//       //     success: true,
//       //     message: "Assess Create Success",
//       //     data: assess,
//       //   });
//     } catch (error) {
//       await transaction.rollback();
//     }
//   } catch (err) {
//     return next(err);
//   }
// };

//Create Image
exports.createUrl = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    await upload2(req, res)
      .then(() => {
        console.log(req.file);
        return assessService
          .createUrl(req.file)
          .then((result) => {
            const url = "http://" + req.headers.host + result;
            console.log(url);
            res.status(200).json({
              success: true,
              message: messageConstants.ECOMMERCE_UPLOAD_SUSSCESS,
              url: url,
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
      let newPath = item.uploadDir + item.originalname;
      console.log("log new path", newPath);
      const Id = req.params.id;
      const assessUpdate = {
        userId: req.body.userId,
        Description: req.body.Description,
        ImageUrl: newPath,
        Type: req.body.Type,
        UpdatedDate: Date(),
      };
      assessService
        .update(Id, assessUpdate)
        .then((result) => {
          if (result == 1) {
            res.status(200).json({
              success: true,
              message: "Assess Update Success",
              data: assessUpdate,
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
  return assessService
    .delete(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: "Assess Deleted",
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
  return assessService
    .restore(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: "Assess Restore Success",
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
