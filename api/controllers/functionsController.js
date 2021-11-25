const functionService= require('../services/functionService');
const { validationResult } = require('express-validator');
const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');

// Get All Paging
exports.getallpaging= async(req,res)=>{
  const page= parseInt(req.query.page)||1;
  const size=parseInt(req.query.page);
  const {limit,offset}= await Paginator.getPagination(page,size);
  const data={limit,offset};
  return functionService.getallpaging(data).then(data=>{
    const response= Paginator.getPagingData(data,page,limit);
      res.status(200).json({
          message:messageConstants.FUNCTION_FOUND,
          Functions:response
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

// Get All
exports.get= (req,res)=>{
functionService.get().then(data=>{
    res.status(200).json({
        message:messageConstants.FUNCTION_FOUND,
        Functions:data
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


// GetbyID
exports.getbyID =function(req,res){
  const Id= req.params.id;
   functionService.getbyID(Id).then(funct =>{
    if(funct ===null){
        res.status(404).json({
            message:messageConstants.FUNCTION_ID_NOT_FOUND,
        })
    }else{
        res.status(200).json({
            message:messageConstants.FUNCTION_FOUND,
            Function : funct
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


// Create
exports.create =(req,res,next) => {
  try{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(422).json({ errors: errors.array() });
          return;
        }
        const functions= {
          Name:req.body.Name,
          Description:req.body.Description,
          ParentId:  req.body.ParentId,
          Icon:req.body.Icon,
          CreatedBy: req.body.CreatedBy,
          Status: 1,
          Deleted: 0
          }
        return functionService.create(functions).then(result=>{
          res.status(200).json({
            message: messageConstants. FUNCTION_CREATE_SUSSCESS,
            Functions :result
          });
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

// Update
exports.update = (req, res, next) => {
  try{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(422).json({ errors: errors.array() });
          return;
        }
        const Id =  req.params.id;
        const functionUpdate= {
         Name:req.body.Name,
         Description:req.body.Description,
         ParentId:  req.body.ParentId,
         Icon:req.body.Icon,
         UpdatedBy:req.body.UpdatedBy,
         UpdatedDate:Date(),
         }
        functionService.update(Id,functionUpdate).then( result=>{
          if(result==true){
        res.status(200).json({
        message: messageConstants. FUNCTION_UPDATE_SUSSCESS,
        FunctionUpdate :functionUpdate
      });
  }else{
      res.status(404).json({
          message: result.message,
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
      }catch(err){
        return next(err);
      }
};
//Soft delete
exports.delete =function(req,res,next){
const Id= req.params.id;
const options = {field: 'Deleted', Deleted: 1,UpdatedDate:Date()};
  functionService.delete(Id,options).then(result =>{
    if(result==true){
      res.status(200).json({
          message: messageConstants. FUNCTION_DELETED,
    });
  }else{
    res.status(404).json({
        message: messageConstants.FUNCTION_NOT_FOUND,
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
// // Delete
exports.destroy = function(req, res){
  const Id =  req.params.id;
 functionService.destroy(Id).then(result=>{
    if(result==null){
          res.status(404).json({
          message: messageConstants.FUNCTION_DELETED,
      });
    }else{
      res.status(200).json({
      message: messageConstants.FUNCTION_DELETED
            });
          }        
       }).catch(err =>{
           res.json({
              error:{
             status: err.status ||500,
             message: err.message
            },
      })
  });
};
// Restore
exports.restore =function(req,res){
  const Id =  req.params.id;
  const options = {field: 'Deleted', Deleted: 0};
  functionService.restore(Id,options).then(result=>{
    if(result==true){
                     res.status(200).json({
                         message: messageConstants.FUNCTION_RESTORE_SUSSCESS,
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
