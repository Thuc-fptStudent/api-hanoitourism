const brandService= require('../services/brandService');
const { validationResult } = require('express-validator');
const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');
const formidable = require('formidable');
const fs = require('fs');

// get all
exports.get = async function (req, res) {
    await brandService.get().then( result =>{
      res.status(200).json({
       success: true,
       message:messageConstants.BRAND_FOUND,
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
  return brandService.getbyID(Id).then(result=>{
    if(result===null){
      res.status(404).json({
        message: messageConstants.BRAND_ID_NOT_FOUND,
      });
    }else{
      res.status(200).json({
        success: true,
        message: messageConstants.BRAND_FOUND,
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
    return brandService.getallpaging(data).then( result =>{
      const response = Paginator.getPagingData(result, page, limit);
      res.status(200).json({
        success: true,
        message: messageConstants.BRAND_FOUND,
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
 //create
 exports.create = async(req, res, next) => {
  try{
   const errors = validationResult(req); 
   if(!errors.isEmpty()){
     res.status(422).json({errors: errors.array()});
     return;
   }
   const brand={
     Name: req.body.Name,
     Description: req.body.Description,
     EcommerceId: req.body.EcommerceId,
     CreatedBy: req.body.CreatedBy,
     Status: 1,
     Deleted: 0
   }
   brandService.create(brand).then(result=>{
     res.status(200).json({
       success: true,
       message: messageConstants.BRAND_CREATE_SUCCESS,
       brand: result
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

  // Update
exports.update = (req, res, next) => {
    try{
      const errors = validationResult(req);
          if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          }
          const Id =  req.params.id;
          const brandUpdate= {   
            Name:req.body.Name,
            Description:req.body.Description,
            ImageUrl:req.body.ImageUrl,
            EcommerceId: req.body.EcommerceId,
           UpdatedBy:req.body.UpdatedBy,
           UpdatedDate:Date(),
       }
        brandService.update(Id,brandUpdate).then( result=>{
          if(result==1){
              res.status(200).json({
                success: true,
                  message: messageConstants.BRAND_UPDATE_SUSSCESS,
                  brandUpdate :brandUpdate
              });
          }else{
              res.status(404).json({
                  message: result.message,
              })
          }
      }).catch(err =>{
          res.send({
              error:{
                  status: err.status ||500,
                  message: err.message
              },
           })
          });
        }catch(err){
          return next(err);
        }
  };

  // delete
  exports.destroy = function(req,res){
    const Id =  req.params.id;
    return brandService.destroy(Id).then(result =>{
    if(result==true){
      res.status(200).json({
        success: true,
        message: messageConstants.BRAND_DELETED,
      
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
         message:err.message
        },
      })
    });
  };