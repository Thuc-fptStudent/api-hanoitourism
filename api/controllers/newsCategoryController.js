const newsCateService = require("../Services/newsCategoryService");
const { validationResult } = require("express-validator");
const messageConstants = require("../constant/messageConstants");
const Paginator = require('../commons/paginator');

//getall
exports.getAll = (req, res) => {
    newsCateService.get().then(data => {
        res.status(200).json({
            success: true,
            message: messageConstants.NEWS_CATEGORY_NOT_FOUND,
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
exports.getallpaging = async (req,res)=> {
    const page = parseInt(req.query.page) ||1;
    const size = parseInt(req.query.size);
    const { limit, offset } = Paginator.getPagination(page, size);
    const data = { limit, offset };
    await newsCateService.getallpaging(data).then(data => {
        const reponse = Paginator.getPagingData(data, page, limit);
        res.status(200).json({
            success: true,
            message: messageConstants.NEWS_CATEGORY_NOT_FOUND,
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

//create
exports.create = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(402).json({errors: errors.array()});
            return;
        }
        const newsCate = {
            Name: req.body.Name,
            Description: req.body.Description,
            ImageUrl: req.body.ImageUrl,
            EcommerceId: req.body.EcommerceId,
            CreatedBy: req.body.CreatedBy,
            Status: 1,
            Deleted: 0
        }
        newsCateService.create(newsCate).then(result => {
            res.status(200).json({
                success: true,
                message: messageConstants.NEWS_CATEGORY_CREATE_SUSSCESS,
                newsCate: result
            });
        }).catch(err => {
            res.send({
                error: {
                    status: err.status ||500,
                    message: err.message
                }
            });
        })
    } catch (err) {
        return next(err);
    }
};

//getbyid
exports.getById = (req, res) => {
    newsCateService.getById(req.params.id).then(newsCate => {
        if(newsCate === null){
            res.status(200).json({
                message: messageConstants.NEWS_CATEGORY_FOUND
            })
        }else{
            res.status(200).json({
                success: true,
                message: messageConstants.NEWS_CATEGORY_NOT_FOUND,
                newsCate: newsCate
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
        if(!errors.isEmpty()){
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const Id = req.params.id;
        const newsCateUpdate = {
            Name: req.body.Name,
            Description: req.body.Description,
            ImageUrl: req.body.ImageUrl,
            EcommerceId: req.body.EcommerceId,
            UpdatedBy: req.body.UpdatedBy,
            UpdatedDate: Date()
        };
        newsCateService.update(Id, newsCateUpdate).then((result) => {
            if(result == 1){
                res.status(200).json({
                    success: true,
                    message: messageConstants.NEWS_CATEGORY_UPDATE_SUSSCESS
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
        return next(err)
    }
};

//delete
exports.destroy = (req,res) => {
    const Id = req.params.id;
   newsCateService.destroy(Id).then((result) => {
       if(result == true){
           res.status(200).json({
               success: true,
               result: result,
               message: messageConstants.NEWS_CATEGORY_DELETED
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
}

//soft delete
exports.delete = (req,res) => {
    const Id = req.params.id;
    const options = { field: "Deleted", Deleted: 1, UpdatedDate: Date() };
    newsCateService.delete(Id, options).then((result) => {
        if(result == true){
            res.status(200).json({
                success: true,
                message: messageConstants.NEWS_CATEGORY_DELETED
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
exports.restore = (req,res) => {
    const Id = req.params.id;
    const options = { field: "Deleted", Deleted: 0, UpdatedDate: Date() };
    newsCateService.restore(Id, options).then((result) => {
        if(result == true){
            res.status(200).json({
                success: true,
                message: messageConstants.NEWS_CATEGORY_RESTORE_SUSSCESS
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
}