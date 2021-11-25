const customerService = require("../services/customerService");
const { validationResult } = require("express-validator");
const messageConstants = require("../constant/messageConstants");
const Paginator = require("../commons/paginator");

// Get All
exports.get = async function (req, res) {
  await customerService
    .get()
    .then((result) => {
      res.status(200).json({
        success: true,
        message: messageConstants.CUSTOMER_FOUND,
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 500,
      });
    });
};

// Get All By Paging
exports.getallpaging = async function (req, res) {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size);
  var condition = JSON.stringify(req.query) || null;
  const { limit, offset } = Paginator.getPagination(page, size);
  const data = { limit, offset, condition };
  await customerService
    .getallpaging(data)
    .then((result) => {
      const response = Paginator.getPagingData(result, page, limit);
      res.status(200).json({
        success: true,
        message: messageConstants.CUSTOMER_FOUND,
        data: response,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 500,
      });
    });
};

// GetbyID
exports.getbyID = function (req, res) {
  const Id = req.params.id;
  customerService
    .getbyID(Id)
    .then((customer) => {
      if (customer === null) {
        res.status(409).json({
          message: messageConstants.CUSTOMER_ID_NOT_FOUND,
        });
      } else {
        res.status(200).json({
          success: true,
          message: messageConstants.CUSTOMER_FOUND,
          Customer: customer,
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

// Register
exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const customer = {
      UserName: req.body.UserName,
      Password: req.body.Password,
      FullName: req.body.FullName,
      EcommerceId: req.body.EcommerceId,
      Email: req.body.Email,
      Phone: req.body.Phone,
      Avatar: req.body.Avatar,
    };
    customerService
      .register(customer)
      .then((result) => {
        if (result.message) {
          res.status(404).json({
            message: messageConstants.CUSTOMER_CREATE_FAIL,
            messageError: result.message,
          });
        } else {
          res.status(200).json({
            success: true,
            message: messageConstants.CUSTOMER_CREATE_SUSSCESS,
            Customer: result,
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
// Update
exports.update = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const Id = req.params.id;
    const options = {
      UserName: req.body.UserName,
      Password: req.body.Password,
      FullName: req.body.FullName,
      Email: req.body.Email,
      Phone: req.body.Phone,
      Avatar: req.body.Avatar,
      EcommerceId: req.body.EcommerceId,
      Id: req.body.Id,
      StoreId: req.body.StoreId,
      UpdatedBy: req.body.UpdatedBy,
      UpdatedDate: Date(),
    };
    customerService
      .update(Id, options)
      .then((result) => {
        if (result == true) {
          res.status(200).json({
            success: true,
            message: messageConstants.CUSTOMER_UPDATE_SUSSCESS,
            CustomerUpdate: options,
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
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const Id = req.params.id;
    const options = { field: "Deleted", Deleted: 1, UpdatedDate: Date() };
    customerService
      .delete(Id, options)
      .then((result) => {
        if (result == true) {
          res.status(200).json({
            success: true,
            message: messageConstants.CUSTOMER_DELETED,
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
  } catch (err) {
    return next(err);
  }
};
// Delete
exports.destroy = function (req, res) {
  const Id = req.params.id;
  return customerService
    .destroy(Id)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: messageConstants.CUSTOMER_DELETED,
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
  customerService
    .restore(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: messageConstants.CUSTOMER_RESTORE_SUSSCESS,
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
// Login
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const account = {
      UserName: req.body.UserName,
      Password: req.body.Password,
    };
    customerService
      .login(account)
      .then((data) => {
        if ((data.accessToken, data.refreshToken)) {
          res.status(200).json({
            success: true,
            Account: account.UserName,
            Token: data,
            Id: data.Id,
            UserName: data.customer.UserName,
            FullName: data.customer.FullName,
            Email: data.customer.Email,
            Phone: data.customer.Phone,
            Avatar: data.customer.Avatar,
          });
        } else {
          res.status(200).json({
            Account: account.UserName,
            message: data.message,
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

// Get bookings sort customer by id
exports.getBookings = (req, res) => {
  const Id = req.params.id;
  console.log(Id);
  customerService
    .getBookings(Id)
    .then((data) => {
      res.status(200).json({
        success: true,
        message: messageConstants.CUSTOMER_FOUND,
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

// Get list bookings sort categories
exports.getListBookings = (req, res) => {
  customerService
    .getListBookings()
    .then((data) => {
      res.status(200).json({
        success: true,
        message: messageConstants.CUSTOMER_FOUND,
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

//get address sort user
exports.getListAddress= (req,res)=>{
  customerService.getListAddress().then( data =>{
   res.status(200).json({
     success: true,
   message:"Customer Founded",
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

//get address sort user by id
exports.getAddress= (req,res)=>{
  Id = req.params.id;
  customerService.getAddress(Id).then( data =>{
   res.status(200).json({
     success: true,
   message:"Customer Founded",
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
