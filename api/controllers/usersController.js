const userService = require("../services/userService");
const { validationResult } = require("express-validator");
const messageConstants = require("../constant/messageConstants");
const models = require("../../models");
const Paginator = require("../commons/paginator");
const Op = models.Sequelize.Op;
const upload = require("../middlewares/upload");

// Get All
exports.get = async function (req, res) {
  await userService
    .get()
    .then((result) => {
      res.status(200).json({
        success: true,
        message: messageConstants.USER_FOUND,
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 500,
      });
    });
};

// Get All paging
exports.getallpaging = async function (req, res) {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size);
  var condition = JSON.stringify(req.query) || null;
  const { limit, offset } = Paginator.getPagination(page, size);
  const data = { limit, offset, condition };
  await userService
    .getallpaging(data)
    .then((result) => {
      const response = Paginator.getPagingData(result, page, limit);
      res.status(200).json({
        success: true,
        data: response,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 500,
      });
    });
};

// Get stores
exports.getStores = (req, res) => {
  userService
    .getStores(req, res)
    .then((data) => {
      res.status(200).json({
        success: true,
        message: messageConstants.USER_FOUND,
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

// Get roles
exports.getRoles = (req, res) => {
  userService
    .getRoles()
    .then((data) => {
      res.status(200).json({
        success: true,
        message: messageConstants.USER_FOUND,
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
  userService
    .getbyID(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(409).json({
          message: messageConstants.USER_ID_NOT_FOUND,
        });
      } else {
        res.status(200).json({
          success: true,
          message: messageConstants.USER_FOUND,
          data: user,
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
    await upload(req,res);
    const file = req.files;
    file.forEach(item => {
      item.uploadDir = "/upload/uploads/";
      let newPath = item.uploadDir + item.originalname;
      console.log("log new path", newPath);
      const account = {
        UserName: req.body.UserName,
        Password: req.body.Password,
        FullName: req.body.FullName,
        Gender: req.body.Gender,
        DoB: req.body.DoB,
        Nation: req.body.Nation,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Avatar: newPath,
        Type: req.body.Type,
        StoreId: req.body.StoreId,
        CreatedBy: req.body.CreatedBy,
        Status: 1,
        Deleted: 0,
      };
      console.log(account);
      if (account.Type == 1 || account.Type == 2) {
        userService
          .register1(account)
          .then((result) => {
            if (result.message) {
              res.json({
                success: false,
                error: {
                  status: 404,
                  message: result.message,
                },
              });
            } else {
              res.status(200).json({
                success: true,
                message: messageConstants.USER_CREATE_SUSSCESS,
                data: result,
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
      } else {
        userService
          .register2(account)
          .then((result) => {
            if (result.message) {
              res.json({
                success: false,
                error: {
                  status: 404,
                  message: result.message,
                },
              });
            } else {
              res.status(200).json({
                success: true,
                message: messageConstants.CUSTOMER_CREATE_SUSSCESS,
                data: result,
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
        }
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
    const Id = req.params.id;
    const userUpdate = {
      UserName: req.body.UserName,
      Password: req.body.Password,
      FullName: req.body.FullName,
      Gender: req.body.Gender,
      DoB: req.body.DoB,
      Nation: req.body.Nation,
      Email: req.body.Email,
      Phone: req.body.Phone,
      Avatar: req.body.Avatar,
      Type: req.body.Type,
      StoreId: req.body.StoreId,
      UpdatedBy: req.body.UpdatedBy,
      UpdatedDate: Date(),
    };
    userService
      .update(Id, userUpdate)
      .then(async (result) => {
        if (result == true) {
          const data = await models.users.findOne({ Id: Id });
          res.status(200).json({
            success: true,
            message: messageConstants.USER_UPDATE_SUSSCESS,
            data: data,
          });
        } else {
          res.json({
            success: false,
            error: {
              status: 404,
              message: result.message,
            },
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
    userService
      .delete(Id, options)
      .then((result) => {
        if (result == true) {
          res.status(200).json({
            success: true,
            message: messageConstants.USER_DELETED,
          });
        } else {
          res.json({
            success: false,
            error: {
              status: 404,
              message: result.message,
            },
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
  userService
    .destroy(Id)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: messageConstants.USER_DELETED,
        });
      } else {
        res.json({
          success: false,
          error: {
            status: 404,
            message: result.message,
          },
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
  userService
    .restore(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: messageConstants.USER_RESTORE_SUSSCESS,
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
    const result = await userService.check(account);
    console.log("log result",result.user.Type);
    if (result.user.Type == 1) {
      userService
        .login1(account)
        .then((data) => {
          if ((data.accessToken, data.refreshToken)) {
            res.status(200).json({
              success: true,
              message: messageConstants.USER_LOGIN_SUSSCESS,
              Id: data.user.Id,
              UserName: data.user.UserName,
              FullName: data.user.FullName,
              Email: data.user.Email,
              Phone: data.user.Phone,
              Avatar: data.user.Avatar,
              AccessToken: data.accessToken,
              RefreshToken: data.refreshToken,
            });
          } else {
            res.json({
              success: false,
              error: {
                status: 404,
                message: result.message,
              },
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
    } else{
      userService
        .login2(account)
        .then((data) => {
          if ((data.accessToken, data.refreshToken)) {
            res.status(200).json({
              success: true,
              message: messageConstants.CUSTOMER_LOGIN_SUSSCESS,
              Id: data.customer.Id,
              UserName: data.customer.UserName,
              FullName: data.customer.FullName,
              Email: data.customer.Email,
              Phone: data.customer.Phone,
              Avatar: data.customer.Avatar,
              AccessToken: data.accessToken,
              RefreshToken: data.refreshToken,
            });
          } else {
            res.json({
              success: false,
              error: {
                status: 404,
                message: result.message,
              },
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
    }
  } catch (err) {
    return next(err);
  }
};
//Reset_password
exports.resetPassword = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const request = {
      user_name: req.body.UserName,
      password: req.body.Password,
      new_password: req.body.new_password,
    };
    userService
      .resetPassword(request)
      .then((result) => {
        if (result.message) {
          res.json({
            success: false,
            error: {
              status: 404,
              message: result.message,
            },
          });
        } else {
          res.status(200).json({
            success: true,
            message: messageConstants.USER_LOGIN_SUSSCESS,
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

// Forget_password
exports.forgetPassword = (req, res, next) => {
  const request = {
    token: req.body.token,
    password: req.body.password,
  };
  userService
    .forgetPassword(request)
    .then((result) => {
      if (result.message) {
        res.json({
          success: false,
          error: {
            status: 404,
            message: result.message,
          },
        });
      } else {
        res.status(200).json({
          success: true,
          message: messageConstants.USER_LOGIN_SUSSCESS,
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

exports.sendVerify = async function (req, res) {
  const email = req.body.email;
  await userService
    .getByEmail(email)
    .then(async (user) => {
      if (user.message) {
        res.json({
          success: false,
          error: {
            status: 404,
            message: user.message,
          },
        });
      } else {
        const tokenObject = {
          email: user.email,
          id: user.id,
        };
        var secret = user.id + "_" + user.email + "_" + new Date().getTime();
        var token = jwt.sign(tokenObject, secret);
        var options = token;
        await userService.updateResetPassword(user.id, options);
        var transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: `hoanganlxt666666@gmail.com`,
            pass: `phamhoangan131299`,
          },
        });
        const from_email = "hoanganlxt666666@gmail.com";
        const to_email = `${email}`;
        var url = "http://" + req.headers.host + "/forgot-pass/" + token;
        var mailOptions = {
          from: from_email,
          to: to_email,
          subject: "Password help has arrived!",
          text: `Click to verify: ${url}`,
        };
        await transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            res.json({
              success: false,
              error: {
                status: 404,
                message: error,
              },
            });
          } else {
            res.status(200).json({
              success: true,
              verify_data: mailOptions,
            });
          }
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

//get address sort user
exports.getListAddress= (req,res)=>{
  userService.getListAddress().then( data =>{
   res.status(200).json({
     success: true,
   message:"User Founded",
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
  userService.getAddress(Id).then( data =>{
   res.status(200).json({
     success: true,
   message:"User Founded",
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

//get booking sort user
exports.getListBooking= (req,res)=>{
  userService.getListBookings().then( data =>{
   res.status(200).json({
     success: true,
   message:"User Founded",
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

//get bookings sort user by id
exports.getBooking= (req,res)=>{
  Id = req.params.id;
  userService.getBookings(Id).then( data =>{
   res.status(200).json({
     success: true,
   message:"User Founded",
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

//get store sort user
exports.getListStore= (req,res)=>{
  userService.getListStore().then( data =>{
   res.status(200).json({
     success: true,
   message:"User Founded",
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

//get store sort user by id
exports.getStore= (req,res)=>{
  Id = req.params.id;
  userService.getStore(Id).then( data =>{
   res.status(200).json({
     success: true,
   message:"User Founded",
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
