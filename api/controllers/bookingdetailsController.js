const bookingDetailService= require('../services/bookingDetailService');
const { validationResult } = require('express-validator');
const messageConstants = require('../constant/messageConstants');
const Paginator = require('../commons/paginator');

// Get All
exports.get= (req,res)=>{
  return bookingDetailService.get().then(result =>{

    res.status(200).json({
      success: true,
    message:messageConstants.BOOKING_DETAILS_FOUND,
    data:result
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

// Get All Paging
exports.getallpaging= async function(req,res){
  const page= parseInt(req.query.page)||1;
  const size= parseInt(req.query.size);
  const {limit,offset}= Paginator.getPagination(page,size);
  const data= {limit,offset};
  return bookingDetailService.getallpaging(data).then(result =>{
    const response= Paginator.getPagingData(result,page,limit);
    res.status(200).json({
      success: true,
    message:messageConstants.BOOKING_DETAILS_FOUND,
    data:response
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
exports.getProducts= (req,res)=>{
bookingDetailService.getProducts().then(data=>{
    res.status(200).json({
      success: true,
    message:messageConstants.BOOKING_DETAILS_FOUND,
    BookingDetails:data
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
  return bookingDetailService.getbyID(req.params.id).then(bookingDetails=>{
    if(bookingDetails===null){
     res.status(200).json({
        message:messageConstants.BOOKING_DETAILS_ID_NOT_FOUND,
        })
    }else{
        res.status(200).json({
          success: true,
           message:messageConstants.BOOKING_DETAILS_FOUND,
           BookingDetails:bookingDetails
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
        const booking_details= {

          BookingId:  req.body.BookingId,
          ProductId: req.body.ProductId,
          Price:  req.body.Price,
          Description:  req.body.Description,
          CreatedBy: req.body.CreatedBy,
          Status: 1,
          Deleted: 0
      }
        return bookingDetailService.create(booking_details).then(result=>{
          res.status(200).json({
            success: true,
             message: messageConstants.BOOKING_DETAILS_CREATE_SUSSCESS,
             BookingDetails :result
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
        const options= {
            BookingId:  req.body.BookingId,
            ProductId: req.body.ProductId,
            Price:  req.body.Price,
            Description:  req.body.Description,
            UpdatedBy:req.body.UpdatedBy,
            UpdatedDate:Date(),
       }
        return bookingDetailService.update(Id,options).then( result=>{
          if(result==true){
          res.status(200).json({
            success: true,
             message: messageConstants.BOOKING_DETAILS_UPDATE_SUSSCESS,
             DetailsUpdate :options
             });
          }else{
             res.status(200).json({
                message: messageConstants.BOOKING_DETAILS_UPDATE_FAIL,
                messageError: result.message
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
//Delete
exports.destroy =function(req,res,next){
  const Id =  req.params.id;
  return bookingDetailService.destroy(Id).then(result =>{
    if(!result){
      res.status(200).json({
        success: true,
         message: messageConstants.BOOKING_DETAILS_DELETED,
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
// Soft Delete
exports.delete =function(req,res){
const Id= req.params.id;
const options = {field: 'Deleted', Deleted: 1,UpdatedDate:Date()};
 bookingDetailService.delete(Id,options).then(result=>{
  if(result==true){
        res.status(200).json({
          success: true,
        message: messageConstants.BOOKING_DETAILS_DELETED,
        });
  }else{
     res.status(404).json({
     message:  result.message
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
  const Id= req.params.id;
const options = {field: 'Deleted', Deleted: 0,UpdatedDate:Date()};
  return bookingDetailService.restore(Id,options).then(result=>{
    if(result==true){
       res.status(200).json({
        success: true,
          message: messageConstants.BOOKING_DETAILS_RESTORE_SUSSCESS,
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