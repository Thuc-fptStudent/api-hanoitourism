const notificationService= require('../services/notificationService');
const { validationResult } = require('express-validator');const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');


// Get All
exports.get=async (req,res)=>{
  await notificationService.get().then(result=>{
    res.status(200).json({
      success: true,
        message:messageConstants.NOTIFICATION_FOUND,
        result: result
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
exports.getallpaging=async (req,res)=>{
  const  page = parseInt(req.query.page) || 1;
   const  size = parseInt(req.query.size);
  const {limit,offset}= await Paginator.getPagination(page,size);
  const data= {limit,offset};
  await notificationService.getallpaging(data).then(result=>{
    const response= Paginator.getPagingData( result,page, limit);
    res.status(200).json({
      success: true,
        message:messageConstants.NOTIFICATION_FOUND,
        result: response
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
   notificationService.getbyID(Id).then(notics=>{
    if(notics===null){
        res.status(200).json({
            message:messageConstants.NOTIFICATION_ID_NOT_FOUND,
        })
    }else{
        res.status(200).json({
          success: true,
            message:messageConstants.NOTIFICATION_FOUND,
            notics:notics
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
        const notifications= {
          Name:req.body.Name,
          Content:req.body.Content,
          EcommerceId: req.body.EcommerceId,
          StoreId:req.body.StoreId,
          CreatedBy: req.body.CreatedBy,
          Status: 1,
          Deleted: 0
          }
         notificationService.create(notifications).then(result=>{
          res.status(200).json({
            success: true,
            message: messageConstants.NOTIFICATION_CREATE_SUSSCESS,
            notifications :result
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
        const notificationUpdate= {
         Name:req.body.Name,
         Content:req.body.Content,
         EcommerceId: req.body.EcommerceId,
         StoreId:req.body.StoreId,
         UpdatedBy:req.body.UpdatedBy,
         UpdatedDate:Date(),
         }
        notificationService.update(Id,notificationUpdate).then( async(result)=>{
          if(result==true){
          res.status(200).json({
          success: true,
          message: messageConstants.NOTIFICATION_UPDATE_SUSSCESS,
          notificationUpdate :notificationUpdate
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
// // Delete
exports.destroy =function(req,res){
  const Id =  req.params.id;
  notificationService.destroy(Id).then(result =>{
    if(result===null){
     res.status(404).json({
         message: messageConstants.NOTIFICATION_NOT_FOUND
        });
  }else{
      res.status(200).json({
        success: true,
          message: messageConstants.NOTIFICATION_DELETED,
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
  return notificationService.delete(Id,options).then(result=>{
    if(result==true){
        res.status(200).json({
          success: true,
        message: messageConstants.NOTIFICATION_DELETED,
        })
  }else{
      res.status(500).json({
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
  const options = {field: 'Deleted', Deleted: 0, UpdatedDate:Date()}
  return notificationService.restore(Id,options).then(result=>{
    if(result==true){
            res.status(200).json({
              success: true,
            message: messageConstants.NOTIFICATION_RESTORE_SUSSCESS,
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
