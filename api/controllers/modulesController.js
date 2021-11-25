const moduleService= require('../services/moduleService');
const { validationResult } = require('express-validator');
const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');
// Get All
exports.get= async(req,res)=>{
  return moduleService.get().then(data=>{
    res.status(200).json({
        message:messageConstants.MODULE_FOUND,
        Modules :data
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
// Get All with paging
exports.getallpaging= async(req,res)=>{
  const page= parseInt(req.query.page)||1;
  const size=parseInt(req.query.page);
  const {limit,offset}= await Paginator.getPagination(page,size);
  const data={limit,offset};
  return moduleService.getallpaging(data).then(data=>{
    const response= Paginator.getPagingData(data,page,limit);
    res.status(200).json({
        message:messageConstants.MODULE_FOUND,
        Modules :response
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

// Filter combine
exports.filter= async(req,res)=>{
   moduleService.filter().then(data=>{
    res.status(200).json({
        message:messageConstants.MODULE_FOUND,
        Modules :data
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
   moduleService.getbyID(Id).then(module=>{
    if(module===null){
        res.status(200).json({
        message:messageConstants.MODULE_ID_NOT_EXIST,
        })
    }else{
        res.status(200).json({
          success:true,
            message:messageConstants.MODULE_FOUND,
            Module:module
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
        const modules= {
          Name:req.body.Name,
          Url: req.body.Url,
          Description:req.body.Description,
          ParentId:  req.body.ParentId,
          Icon:req.body.Icon,
          CreatedBy: req.body.CreatedBy,
          Status: 1,
          Deleted: 0
          }
         moduleService.create(modules).then(result=>{
          res.status(200).json({
            success:true,
            message: messageConstants.MODULE_CREATE_SUSSCESS,
            data :result
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
        const moduleUpdate= {
         Name:req.body.Name,
         Url: req.body.Url,
         Description:req.body.Description,
         ParentId:  req.body.ParentId,
         Icon:req.body.Icon,
         UpdatedBy:req.body.UpdatedBy,
         UpdatedDate:Date(),
         }
        moduleService.update(Id,moduleUpdate).then( result=>{
        if(result==true){
        res.status(200).json({
          success:true,
        message: messageConstants.MODULE_UPDATE_SUSSCESS,
        ModuleUpdate :moduleUpdate
      });
  }else{
      res.status(500).json({
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
const options = {field: 'Deleted', Deleted: 1,  UpdatedDate:Date(),}
  return moduleService.delete(Id,options).then(result=>{
    if(result==true){
        res.status(200).json({
          success:true,
          message: messageConstants.MODULE_DELETED,
        })
      }else{
      res.status(500).json({
      message:result.message
        })
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

// // Delete
exports.destroy =function(req,res){
  const Id =  req.params.id;
  moduleService.destroy(Id).then(result =>{
    if(result==true){
     res.status(200).json({
         message: messageConstants.MODULE_DELETED
        });
  }else{
      res.status(404).json({
          message:result.message
    });
  }
}).catch(err =>{
res.send({
      error:{
        status: err.status ||500,
        message:err.message
      }
    })
  });
};

// Restore
exports.restore =function(req,res){
  const Id =  req.params.id;
  const options = {field: 'Deleted', Deleted: 0}
   moduleService.restore(Id,options).then(result=>{
    if(result==true){
      res.status(200).json({
      message: messageConstants.MODULE_RESTORE_SUSSCESS,
        });
      }else{
      res.status(404).json({
      message: result.message
          });
        }     
      }).catch(err =>{
         res.send({
             error:{
              tatus: err.status ||500,
             message: err.message
         },
     })
   });
};
