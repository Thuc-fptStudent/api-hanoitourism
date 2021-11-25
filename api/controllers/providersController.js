const providerService= require('../services/providerService');
const { validationResult } = require('express-validator');
const messageConstants = require('../constant/messageConstants');



  // Create
  exports.create =(req,res,next) => {
    try{
      const errors = validationResult(req);
          if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          }
          const provider= {
            Name:req.body.Name,
            EcommerceId: req.body.EcommerceId,
            Description:req.body.Description,
            Content:req.body.Content,
            ImageUrl: req.body.ImageUrl ,
            CreatedBy: req.body.CreatedBy,
            Status: 1,
            Deleted: 0
            }
           providerService.create(provider).then(result=>{
            if(result==true){
            res.status(200).json({
              success: true,
              message: messageConstants.PROVIDER_CREATE_SUSSCESS,
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

// Get All
exports.get= (req,res)=>{
  providerService.get().then(data=>{
   res.status(200).json({
     success: true,
       message:messageConstants.PROVIDER_FOUND,
       providers:data
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
   providerService.getallpaging().then(data=>{
    res.status(200).json({
      success: true,
        message:messageConstants.PROVIDER_FOUND,
        providers:data
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
  providerService.getbyID(Id).then(provider=>{
    if(provider===null){
        res.status(200).json({
            message:messageConstants.PROVIDER_ID_NOT_FOUND,
        })
    }else{
        res.status(200).json({
          success: true,
            message:messageConstants.PROVIDER_FOUND,
            provider:provider
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



// Update
exports.update = (req, res, next) => {
  try{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(422).json({ errors: errors.array() });
          return;
        }
        const Id =  req.params.id;
        const providerUpdate= {
           Name:req.body.Name,
           EcommerceId: req.body.EcommerceId,
           Description:req.body.Description,
           Content:req.body.Content,
           Email:  req.body.Email,
           ImageUrl: req.body.ImageUrl ,
           UpdatedBy:req.body.UpdatedBy,
           UpdatedDate:Date(),
           }  
         providerService.update(Id,providerUpdate).then( result=>{
          if(result==true){
            res.status(200).json({
              success: true,
            message: messageConstants.PROVIDER_UPDATE_SUSSCESS,
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
  const Id =  req.params.id;
  const options = {field: 'Deleted', Deleted: 1,UpdatedDate:Date()}
  providerService.delete(Id,options).then(result =>{
    if(result==true){
      res.status(200).json({
        success: true,
      message: messageConstants.PROVIDER_DELETED,
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
        message:err.message
      },
    })
  });
};
// Delete
exports.destroy =function(req,res){
  const Id =  req.params.id;
   providerService.destroy(Id).then(result=>{
    if(result==true){
      res.status(200).json({
        success: true,
        message: messageConstants.PROVIDER_DELETED,
        })
      }else{
      res.status(409).json({
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
  providerService.restore(Id,options).then(result=>{
    if(result==true){
        res.status(200).json({
          success: true,
            message: messageConstants.PROVIDER_RESTORE_SUSSCESS,
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