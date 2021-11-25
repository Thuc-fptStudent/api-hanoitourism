const CityService = require("../Services/cityService");
const { validationResult } = require("express-validator");
const messageConstants = require("../constant/messageConstants");
const Paginator = require("../commons/paginator");

// Get All
exports.getAll = (req, res) => {
  CityService.get()
    .then((data) => {
      res.status(200).json({
        success: true,
        message: data.message,
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
  CityService.getallpaging(data)
    .then((data) => {
      const response = Paginator.getPagingData(data, page, limit);
      res.status(200).json({
        success: true,
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

// Get Combine (Bookings have details's and products's information)
exports.getListcombine = (req, res) => {
  CityService.getListcombine()
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
//get combines id
exports.getcombines = (req, res) => {
  const Id = req.params.id;
  console.log(Id);
  CityService.getcombine(Id)
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

// GetbyID
exports.getbyID = function (req, res) {
  const Id = req.params.id;
  return CityService.getbyID(Id)
    .then((booking) => {
      if (booking === null) {
        res.status(404).json({
          message: booking.message,
        });
      } else {
        res.status(200).json({
          success: true,
          data: booking,
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
    const city = {
      Name: req.body.Name,
    };
    CityService.create(city)
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

// Update
exports.update = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const Id = req.params.id;
    const cityUpdate = {
      Name: req.body.Name,
      UpdatedDate: Date(),
    };
    CityService.update(Id, cityUpdate)
      .then((result) => {
        if (result == 1) {
          res.status(200).json({
            success: true,
            data: cityUpdate,
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
// exports.destroy =function(req,res){
//   const Id =  req.params.id;
//   return BookingService.destroy(Id).then(result =>{
//   if(result==true){
//     res.status(200).json({
//       success: true,
//       message: messageConstants.BOOKINGS_DELETED,

//     });
//   }else{
//   res.status(404).json({
//   message: result.message
//     });
//   }
// }).catch(err =>{
// res.send({
//    error:{
//        status: err.status ||500,
//        message:err.message
//       },
//     })
//   });
// };
//Soft delete
exports.delete = function (req, res, next) {
  const Id = req.params.id;
  const options = { field: "Deleted", Deleted: 1, UpdatedDate: Date() };
  return CityService.delete(Id, options)
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
// Restore
exports.restore = function (req, res) {
  const Id = req.params.id;
  const options = { field: "Deleted", Deleted: 0, UpdatedDate: Date() };
  return CityService.restore(Id, options)
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

//get list cuisine products stores
exports.getListFood = (req, res) => {
  CityService.getListFood()
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

//get food by id
exports.getFood = (req, res) => {
  const Id = req.params.id;
  console.log(Id);
  CityService.getFood(Id)
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

//get district
exports.getListDistrict = (req, res) => {
  CityService.getListDistrict()
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

//get district by id
exports.getDistrict = (req, res) => {
  const Id = req.params.id;
  CityService.getDistrict(Id)
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

