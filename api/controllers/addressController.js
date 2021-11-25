const addressService = require("../Services/addressService");
const { validationResult } = require("express-validator");
const messageConstants = require("../constant/messageConstants");
const Paginator = require("../commons/paginator");

// Get All
exports.getAll = (req, res) => {
  addressService
    .get()
    .then((data) => {
      res.status(200).json({
        success: true,
        message: "Address Founded",
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
  addressService
    .getallpaging(data)
    .then((data) => {
      const response = Paginator.getPagingData(data, page, limit);
      res.status(200).json({
        success: true,
        message: "Address Founded",
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
  return addressService
    .getbyID(Id)
    .then((address) => {
      if (address === null) {
        res.status(404).json({
          message: "Address Id Not Founded",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Address Founded",
          data: address,
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
    const address = {
      Name: req.body.Name,
      userId: req.body.userId,
      Phone: req.body.Phone,
      City: req.body.City,
      District: req.body.District,
      Ward: req.body.Ward,
      Street: req.body.Street,
      Unit: req.body.Unit,
      CityName:req.body.CityName,
      DistrictName:req.body.DistrictName,
      WardName:req.body.WardName,
      AddressCategory: req.body.AddressCategory,
      DefaultAddress: req.body.DefaultAddress,
    };
    console.log(address);
    addressService
      .create(address)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "Address Create Success",
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
    const addressUpdate = {
      Name: req.body.Name,
      userId: req.body.userId,
      Phone: req.body.Phone,
      City: req.body.City,
      District: req.body.District,
      Ward: req.body.Ward,
      Street: req.body.Street,
      Unit: req.body.Unit,
      AddressCategory: req.body.AddressCategory,
      DefaultAddress: req.body.DefaultAddress,
      UpdatedDate: Date(),
    };
    addressService
      .update(Id, addressUpdate)
      .then((result) => {
        if (result == 1) {
          res.status(200).json({
            success: true,
            message: "Address Update Success",
            data: addressUpdate,
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
  const Id = req.params.id;
  const options = { field: "Deleted", Deleted: 1, UpdatedDate: Date() };
  return addressService
    .delete(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: "Address Deleted",
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
  return addressService
    .restore(Id, options)
    .then((result) => {
      if (result == true) {
        res.status(200).json({
          success: true,
          message: "Address Restore Success",
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
