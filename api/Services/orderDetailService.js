const models= require('../../models');
const messageConstants = require('../constant/messageConstants');
const Paginatior = require('../commons/paginator');


//  Sign-in/Create
exports.create=async(order_details)=>{
  return   models.order_details.create(order_details);
   };
   
// Paging by Type
exports.getPagingFilter=async (searchViewModel)=>{
          limit= searchViewModel.limit;
          offset= searchViewModel.offset;
   const user= await models.order_details.findOne({where:{OrderId:searchViewModel.OrderId}});
   if(!user){
      return Promise.resolve({
         message:messageConstants.ORDER_DETAILS_NOT_AVAILABLE,
         });
     }else{
    return models.order_details.findAndCountAll({
      where:{OrderId: searchViewModel.OrderId},
      limit: limit,
      offset: offset   
    });
   };
};


// Find All
exports.get= ()=>{
   return  models.order_details.findAndCountAll();
};

// Find All
exports.getallpaging= (searchViewModel)=>{
   limit= searchViewModel.limit;
   offset= searchViewModel.offset;
   return  models.order_details.findAndCountAll({ 
      limit: limit,
      offset: offset,
    });
};



// FindById
exports.getbyID = async(Id)=>{
   return models.order_details.findOne({where:{Id:Id}});
};


 // Update 
 exports.update=async(Id,detailUpdate)=>{
   const id= await models.order_details.findOne({Id:Id});
   if(!id){
      return Promise.resolve({
         message: messageConstants.ORDERS_ID_NOT_FOUND
      });
   }else{
      const deleted= await models.order_details.findOne({Deleted:0});
      if(!deleted){
         return Promise.resolve({
            message: messageConstants.ORDERS_NOT_AVAILABLE
         });
      }else{
   return  models.order_details.update(detailUpdate,{where:{Id:Id}});
      };
   };
 };



 //  Delete
 exports.destroy=async (Id)=>{
   const id= await models.order_details.findOne({Id:Id});
   if(!id){
      return Promise.resolve({
         message: messageConstants.ORDERS_ID_NOT_FOUND
      });
   }else{
   return models.order_details.destroy({where:{Id:Id}});
   };
};


//  Deleted fake
exports.delete= async(Id,options)=>{
   const id= await models.order_details.findOne({where:{Id:Id}});
   if(id){
       const deleted= await models.order_details.findOne({where:{Deleted:1}});
       if(deleted===null){
           return models.order_details.update(options,{where:{Id:Id,Deleted:0}});
       }else{
           return Promise.resolve({
              message: messageConstants.ORDER_DETAILS_NOT_AVAILABLE ,
           });
       }
   }else{
           return Promise.resolve({
           message: messageConstants.ORDER_DETAILS_ID_NOT_FOUND ,
     });
      }
};



// Restore
exports.restore= async(Id,options)=>{
   const id= await models.order_details.findOne({Id:Id});
   if(!id){
      return Promise.resolve({
         message: messageConstants.ORDER_DETAILS_ID_NOT_FOUND ,
      });
   }else{
      const deleted= await models.order_details.findOne({where:{Deleted:1}});
      if(!deleted){
         return Promise.resolve({
            message: messageConstants.ORDER_DETAILS_NOT_AVAILABLE,
         });
      }else{
   return models.order_details.update(options,{where:{Id:Id,Deleted:1}})
      }
   };
};

   
