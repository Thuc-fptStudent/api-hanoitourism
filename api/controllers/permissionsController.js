const permissionService= require('../services/permissionService');
const { validationResult } = require('express-validator');
const messageConstants = require('../constant/messageConstants');
const Paginator= require('../commons/paginator');

// Get All
exports.get= async function (req, res){
   permissionService.get().then( result =>{
    res.status(200).json({
      success: true,
        message:messageConstants.PERMISSION_FOUND,
        data:result
     });
      }).catch(err => {
        res.status(500).send({
        message: err.message ||500
        });
      });
};

// Get All By Paging
exports.getallpaging= async function (req, res){
  const  page = parseInt(req.query.page) || 1;
   const  size = parseInt(req.query.size);
   const { limit, offset } = Paginator.getPagination(page, size);
   const data= {limit,offset};
   permissionService.getallpaging(data).then( result =>{
    const response = Paginator.getPagingData(result, page, limit);
        res.status(200).json({
          success: true,
            message:messageConstants.PERMISSION_FOUND,
            data:response
         });
      }).catch(err => {
        res.status(500).send({
        message: err.message ||500
        });
      });
};

// Get All By Paging By RoleId
exports.getallpagingRoleId= async function (req, res){
  const  page = parseInt(req.query.page) || 1;
   const  size = parseInt(req.query.size);
   const RoleId= req.params.RoleId;
   const { limit, offset } = Paginator.getPagination(page, size);
   const data= {limit,offset,RoleId};
   permissionService.getallpagingRoleId(data).then( result =>{
    const response = Paginator.getPagingData(result, page, limit);
        res.status(200).json({
          success: true,
            message:messageConstants.PERMISSION_FOUND,
            data:response
         });
      }).catch(err => {
        res.status(500).send({
        message: err.message ||500
        });
      });
};


// GetbyID
exports.getbyID =function(req,res){
  const Id= req.params.id;
   permissionService.getbyID(Id).then(permission=>{
    if(permission===null){
        res.status(200).json({
            message:messageConstants.PERMISSION_ID_NOT_FOUND,
        })
    }else{
        res.status(200).json({
          success: true,
            message:messageConstants.PERMISSION_FOUND,
            permission:permission
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

// GetbyRoleID
exports.getbyRoleID =function(req,res){
  const RoleId= req.params.RoleId;
   permissionService.getbyRoleID(RoleId).then(permission=>{
    if(permission===null){
        res.status(200).json({
            message:messageConstants.PERMISSION_ID_NOT_FOUND,
        })
    }else{
        res.status(200).json({
          success: true,
            message:messageConstants.PERMISSION_FOUND,
            permission:permission
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
        const permission= {
          RoleId:req.body.RoleId,
          ModuleId:req.body.ModuleId,
          FunctionId:req.body.FunctionId,
          CreatedBy: req.body.CreatedBy,
          Status: 1,
          Deleted: 0
          }
         permissionService.create(permission).then(result=>{
          res.status(200).json({
            success: true,
          message: messageConstants.PERMISSION_CREATE_SUSSCESS,
          data: result,
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
      const permissionUpdate= {
       RoleId:req.body.RoleId,
       ModuleId:req.body.ModuleId,
       FunctionId:req.body.FunctionId,
       UpdatedBy:req.body.UpdatedBy,
       UpdatedDate:Date(),
       }
       permissionService.update(Id,permissionUpdate).then( result=>{
        if(result==true){
        res.status(200).json({
          success: true,
        message: messageConstants.PERMISSION_UPDATE_SUSSCESS,
    });
}else{
    res.status(200).json({
        message: result.message
    });
  };
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
// // Delete
exports.destroy =function(req,res){
  const Id =  req.params.id;
   permissionService.destroy(Id).then(result =>{
    if(result==true){
     res.status(200).json({
      success: true,
         message: messageConstants.STORE_DELETED,
        });
      }else{
        res.status(404).json({
        message:result.message,
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
//Soft delete
exports.delete =function(req,res,next){
  const Id= req.params.id;
  const options = {field: 'Deleted', Deleted: 1,UpdatedDate:Date()}
  return permissionService.delete(Id,options).then(result=>{
    if(result==true){
          res.status(200).json({
            success: true,
          message: messageConstants.PERMISSION_DELETED,
        })
    }else{
        res.status(404).json({
        message: result.message       
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
// Restore
exports.restore =function(req,res){
  const Id =  req.params.id;
   const options = {field: 'Deleted', Deleted: 0,UpdatedDate:Date()}
  return permissionService.restore(Id,options).then(result=>{
    if(result==true){
                     res.status(200).json({
                      success: true,
                         message: messageConstants.PERMISSION_RESTORE_SUSSCESS,
                     })
                 }else{
                     res.status(404).json({
                         message: result.message
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
};
