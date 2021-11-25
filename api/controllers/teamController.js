const teamService = require("../Services/teamService");
const { validationResult } = require("express-validator");
const messageConstants = require("../constant/messageConstants");
const Paginator = require('../commons/paginator');

//create
exports.create = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(402).json({
        errors: errors.array(),
      });
      return;
    }
    const team = {
        Name: req.body.Name,
        Description: req.body.Description,
        ImageUrl: req.body.ImageUrl,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Owner: req.body.Owner,
        EcommerceId: req.body.EcommerceId,
        CreatedBy: req.body.CreatedBy,
        Status: 1,
        Deleted: 0
    }
    teamService.create(team).then(result => {
        res.status(200).json({
            success: true,
            message: messageConstants.TEAM_CREATE_SUSSCESS,
            team: result
        });
    }).catch(err => {
        res.send({
            error: {
                status: err.status ||500,
                message: err.message
            }
        })
    });
  } catch (err) {
    return next(err);
  }
};

//get all
exports.getAll = (req, res) => {
  teamService.get().then(data => {
      res.status(200).json({
          success: true,
          message: messageConstants.TEAM_NOT_FOUND,
          data: data
      });
  }).catch(err => {
      res.send({
          error: {
              status: err.status ||500,
              message: err.message
          }
      })
  });
};

//get all paging
exports.getallpaging = async (req,res) => {
    const page = parseInt(req.query.page) ||1;
    const size = parseInt(req.query.size);
    const { limit, offset } = Paginator.getPagination(page, size);
    const data = { limit, offset };
    await teamService.getallpaging(data).then(data => {
        const reponse = Paginator.getPagingData(data, page, size);
        res.status(200).json({
            success: true,
            message: messageConstants.TEAM_NOT_FOUND,
            data: reponse
        });
    }).catch(err => {
        res.send({
            error: {
                status: err.status ||500,
                message: err.message
            }
        })
    });
};

//getbyid
exports.getById = (req, res) => {
  teamService.getById(req.params.id).then(team => {
      if(team === null){
          res.status(200).json({
              message: messageConstants.TEAM_FOUND
          })
      }else{
          res.status(200).json({
              success: true,
              message: messageConstants.TEAM_NOT_FOUND,
              team: team
          });
      }
  }).catch(err => {
      res.send({
          error: {
              status: err.status ||500,
              message: err.message
          }
      })
  });
};

//update
exports.update = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const Id = req.params.id;
    const teamUpdate = {
        Name: req.body.Name,
        Description: req.body.Description,
        ImageUrl: req.body.ImageUrl,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Owner: req.body.Owner,
        EcommerceId: req.body.EcommerceId,
        UpdatedBy: req.body.UpdatedBy,
        UpdatedDate: Date()
    };
    teamService.update(Id, teamUpdate).then((result) => {
        if(result == 1){
            res.status(200).json({
                success: true,
                message: messageConstants.TEAM_UPDATE_SUSSCESS
            });
        }else{
            res.status(200).json({
                message: result.message
            });
        }
    }).catch((err) => {
        res.send({
            error: {
                status: err.status ||500,
                message: err.message
            }
        });
    });
  } catch (err) {
    return next(err);
  }
};

//delete
exports.destroy = (req, res) => {
  const Id = req.params.id;
  teamService.destroy(Id).then((result) => {
      if(result == true){
          res.status(200).json({
              success: true,
              result: result,
              message: messageConstants.TEAM_DELETED
          });
      }else{
          res.status(400).json({
              message: result.message
          });
      }
  }).catch((err) => {
      res.send({
          status: err.status ||500,
          message: err.message
      });
  });
};

//soft delete
exports.delete = (req, res) => {
    const Id = req.params.id;
    const options = { field: "Deleted", Deleted: 1, UpdatedDate: Date() };
    teamService.delete(Id, options).then((result) => {
        if(result == true){
            res.status(200).json({
                success: true,
                message: messageConstants.TEAM_DELETED
            });
        }else{
            res.status(500).json({
                message: result.message
            });
        }
    }).catch((err) => {
        res.send({
            error: {
                status: err.status ||500,
                message: err.message
            }
        });
    });
};

//restore
exports.restore = (req, res) => {
    const Id = req.params.id;
    const options = { field: "Deleted", Deleted: 0, UpdatedDate: Date() };
    teamService.restore(Id, options).then((result) => {
        if(result == true){
            res.status(200).json({
                success: true,
                message: messageConstants.TEAM_RESTORE_SUSSCESS
            });
        }else{
            res.status(500).json({
                message: result.message
            });
        }
    }).catch((err) => {
        res.send({
            error: {
                status: err.status ||500,
                message: err.message
            }
        });
    });
};
