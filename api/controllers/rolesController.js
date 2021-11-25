const roleService= require('../services/roleService');
const { validationResult } = require('express-validator');
const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');

// Get All
exports.get= (req,res)=>{
   roleService.get().then(roles=>{
    res.status(200).json({
      success: true,
        message:messageConstants.ROLE_FOUND,
        roles :roles
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

// Get All By Paging
exports.getallpaging= (req,res)=>{
  const  page = parseInt(req.query.page) || 1;
  const  size = parseInt(req.query.size);
  var condition = JSON.stringify(req.query) ||null;
  const { limit, offset } = Paginator.getPagination(page, size);
  const data= {limit,offset,condition};
  roleService.getallpaging(data).then(data=>{
    const response = Paginator.getPagingData(data, page, limit);
   res.status(200).json({
       success: true,
       message:messageConstants.ROLE_FOUND,
       data :response
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

// Getcombine
exports.getcombine= (req,res)=>{
  roleService.getcombine().then(roles=>{
    res.status(200).json({
        success: true,
        message:messageConstants.ROLE_FOUND,
        roles :roles
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
exports.getModules= (req,res)=>{
   roleService.getModules().then(roles=>{
    res.status(200).json({
      success: true,
        message:messageConstants.ROLE_FOUND,
        roles :roles
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
  roleService.getbyID(Id).then(role=>{
    if(role===null){
        res.status(200).json({
            message:messageConstants.ROLE_ID_NOT_FOUND,
        })
    }else{
        res.status(200).json({
          success: true,
            message:messageConstants.ROLE_FOUND,
            role:role
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
        const role= {
          Name:req.body.Name,
          Description:req.body.Description,
          CreatedBy: req.body.CreatedBy,
          Status: 1,
          Deleted: 0
          }
         roleService.create(role).then(result=>{
          res.status(200).json({
            success: true,
          message: messageConstants.ROLE_CREATE_SUSSCESS,
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
        const roleUpdate= {
         Name:req.body.Name,
         Description:req.body.Description,
         UpdatedBy:req.body.UpdatedBy,
         UpdatedDate:Date(),
         }
        return roleService.update(Id,roleUpdate).then( result=>{
          if(result==true){
           res.status(200).json({
                success: true,
               message: messageConstants.ROLE_UPDATE_SUSSCESS,
             });
         }else{
             res.status(200).json({
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
//Soft delete
exports.delete =function(req,res,next){
  const Id= req.params.id;
  const options = {field: 'Deleted', Deleted: 1,UpdatedDate:Date()}
   roleService.delete(Id,options).then(result=>{
    if(result==true){
                        res.status(200).json({
                            success: true,
                            message: messageConstants.ROLE_DELETED,
                        })
                    }else{
                        res.status(500).json({
                            message: result.message,
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
   roleService.destroy(Id).then(result=>{
    if(result==true){
                        res.status(200).json({
                        message: messageConstants.ROLE_DELETED,
                        })
                      }else{
                        res.status(500).json({
                        message: result.message,
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
  return roleService.restore(Id,options).then(result=>{
    if(result==true){
                     res.status(200).json({
                        success: true,
                         message: messageConstants.ROLE_RESTORE_SUSSCESS,
                     })
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
 };