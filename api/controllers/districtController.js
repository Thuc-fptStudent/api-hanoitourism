const disService = require("../Services/districtService");
const { validationResult } = require("express-validator");
const messageConstants = require("../constant/messageConstants");
const Paginator = require("../commons/paginator");

// Get All
exports.get = (req, res) => {
  return disService
    .get()
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
};

// Get All Paging
exports.getallpaging = async function (req, res) {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size);
  const { limit, offset } = Paginator.getPagination(page, size);
  const data = { limit, offset };
  return disService
    .getallpaging(data)
    .then((result) => {
      const response = Paginator.getPagingData(result, page, limit);
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

//get news
exports.getListNews = (req, res) => {
  disService
    .getListNews()
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
exports.getNews = (req, res) => {
  const Id = req.params.id;
  console.log(Id);
  disService
    .getNews(Id)
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
  return disService
    .getbyID(req.params.id)
    .then((district) => {
      if (district === null) {
        res.status(200).json({
          message: district.message,
        });
      } else {
        res.status(200).json({
          success: true,
          data: district,
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
exports.create = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const district = {
      Name: req.body.Name,
      NewsId: req.body.NewsId,
      CityId: req.body.CityId,
      DestinationId: req.body.DestinationId,
    };
    return disService
      .create(district)
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
    const options = {
      Name: req.body.Name,
      NewsId: req.body.NewsId,
      CityId: req.body.CityId,
      UpdatedDate: Date(),
    };
    return disService
      .update(Id, options)
      .then((result) => {
        if (result == true) {
          res.status(200).json({
            success: true,
            data: options,
          });
        } else {
          res.status(200).json({
            message: result.message,
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
  } catch (err) {
    return next(err);
  }
};


// Soft Delete
exports.delete = function (req, res) {
  const Id = req.params.id;
  const options = { field: "Deleted", Deleted: 1, UpdatedDate: Date() };
  disService
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
      res.json({
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
  return disService
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

//get ward by district
exports.getListWard = (req, res) => {
  disService.getListWard()
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

//get ward by district id
exports.getWard = (req, res) => {
  const Id = req.params.id;
  disService.getWard(Id)
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

//get hospital by ward
exports.getListHospital = (req, res) => {
  disService.getListHospital()
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

//get hospital by ward id
exports.getHospital = (req, res) => {
  const Id = req.params.id;
  disService.getHospital(Id)
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

//get pharmacy by district
exports.getListPharmacy = (req, res) => {
  disService.getListPharmacy()
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

//get pharmacy by district id
exports.getPharmacy = (req, res) => {
  const Id = req.params.id;
  disService.getPharmacy(Id)
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

//get bank by district
exports.getListBank = (req, res) => {
  disService.getListBank()
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

//get bank by district id
exports.getBank = (req, res) => {
  const Id = req.params.id;
  disService.getBank(Id)
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

//get ATM by district
exports.getListATM = (req, res) => {
  disService.getListATM()
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

//get ATM by district id
exports.getATM = (req, res) => {
  const Id = req.params.id;
  disService.getATM(Id)
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

//get embassy by district
exports.getListEmbassy = (req, res) => {
  disService.getListEmbassy()
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

//get embassy by district id
exports.getEmbassy = (req, res) => {
  const Id = req.params.id;
  disService.getEmbassy(Id)
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

//get agencies by district
exports.getListAgencies = (req, res) => {
  disService.getListAgencies()
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

//get agencies by district id
exports.getAgencies = (req, res) => {
  const Id = req.params.id;
  disService.getAgencies(Id)
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