const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');
const productFeatureService= require('../services/productFeatureService');
const { validationResult } = require('express-validator');

// get all
exports.get = async function (req, res) {
    await productFeatureService.get().then( result =>{
      res.status(200).json({
       success: true,
       message:messageConstants.PRODUCT_FEATURE_FOUND,
        data: result
      });
       }).catch(err => {
         res.status(500).send({
         message: err.message ||500
         });
       });
 };

 //get by id
exports.getbyID = function (req, res){
    const Id = req.params.id;
    return productFeatureService.getbyID(Id).then(result=>{
      if(result===null){
        res.status(404).json({
          message: messageConstants.PRODUCT_FEATURE_ID_NOT_FOUND,
        });
      }else{
        res.status(200).json({
          success: true,
          message: messageConstants.PRODUCT_FEATURE_FOUND,
          Result: result
        });
      }
    }).catch(err =>{
      res.send({
        errors:{
          status: err.status ||500,
          message: err.message
        },
      })
    });
  };

  // Get all paging '
exports.getallpaging = async function( req,res){
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size);
    const {limit, offset} = Paginator.getPagination(page,size);
    const data= {limit,offset};
    return productFeatureService.getallpaging(data).then( result =>{
      const response = Paginator.getPagingData(result, page, limit);
      res.status(200).json({
        success: true,
        message: messageConstants.PRODUCT_FEATURE_FOUND,
        data: response,
  
      });
    }).catch(err => {
      
        res.send({
          error:{
            status: err.status ||500,
            message: err.message 
          },
        })
      
     
    });
  };

  // Create 
 exports.create = async(req, res, next) => {
    try{
     const errors = validationResult(req); 
     if(!errors.isEmpty()){
       res.status(422).json({errors: errors.array()});
       return;
     }
     const productFeature={
       Name: req.body.Name,
       Description: req.body.Description,
       EcommerceId: req.body.EcommerceId,
       CreatedBy: req.body.CreatedBy,
       Status: 1,
       Deleted: 0
     }
     productFeatureService.create(productFeature).then(result=>{
       res.status(200).json({
         success: true,
         message: messageConstants.PRODUCT_FEATURE_CREATE_SUCCESS,
         productFeature: result
       });
     }).catch(err =>{
       res.send({
         errors:{
           status: err.status || 500,
           message: err.message
         },
       })
     });
     
    }catch(err){
       return next(err);
    }
  };
 
   //update
exports.update = (req, res, next) => {
    try{
      const errors= validationResult(req);
        if(!errors.isEmpty()) {
          res.status(422).json({ errors: errors.array()});
          return;
        }
        const Id = req.params.id;
        const productFeatureUpdate= {
          Name: req.body.Name,
          Description: req.body.Description,
          EcommerceId: req.body.EcommerceId,
          UpdatedBy:req.body.UpdatedBy,
          UpdatedDate: Date(),
        }
        productFeatureService.update(Id,productFeatureUpdate).then( result=>{
          if(result==1){
            res.status(200).json({
              success: true,
              message: messageConstants.PRODUCT_FEATURE_UPDATE_SUSSCESS,
              productFeatureUpdate: productFeatureUpdate
            });
          }else{
            res.status(404).json({
              message: result.message,
            })
          }
        }).catch(err =>{
          res.send({
            errors:{
              status: err.status ||500,
              message: err.message
            },
          })
        })
    }catch(err){
      return next(err);
    }
  };

  //delete
exports.destroy = function(req,res){
    const Id = req.params.id;
    return productFeatureService.destroy(Id).then(result =>{
      if(result==true){
        res.status(200).json({
          success: true,
          message: messageConstants.PRODUCT_FEATURE_DELETED
        });
      }else{
        res.status(404).json({
          message: result.message
        });
      }
    }).catch(err =>{
      res.send({
        error:{
          status: err.status ||500,
          message: err.message
        },
      })
    });
  };