const models= require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const messageConstants = require('../constant/messageConstants');
const Paginatior = require('../commons/paginator');


//Create
exports.create=async(booking_details)=>{
      return  models.booking_details.create(booking_details);
   };
   
// Find All
exports.get= ()=>{
   return  models.booking_details.findAndCountAll();
};


// Find All Paging
exports.getallpaging= (searchViewModel)=>{
   limit= searchViewModel.limit;
   offset= searchViewModel.offset;
   return  models.booking_details.findAndCountAll({ 
        limit: limit,
        offset: offset
    });
};

// Get all informations products in booking-details
exports.getProducts= (req,res)=>{
   models.booking_details.hasMany(models.products, { foreignKey: 'id'});
   models.products.belongsTo(models.booking_details,{foreignKey: 'ProductId'});
   return models.booking_details.findAndCountAll({ 
      include:[{
         model: models.products,
         attributes: ['Name',
         'Description',
         'Content',
         'ParentId',
         'ImageUrl',
         'Price']
      }]
  });
};




// FindById
exports.getbyID = async(Id)=>{
      return models.booking_details.findOne({where:{Id:Id}});
};


 // Update 
 exports.update=async(Id,options)=>{
   const id= await models.booking_details.findOne({where:{Id:Id}});
   if(!id){
      return Promise.resolve({
         message: messageConstants.BOOKING_DETAILS_ID_NOT_FOUND,
      });
   }else{
      const deleted= await models.booking_details.findOne({where:{Deleted:1}});
      if(deleted){
         return Promise.resolve({
            message: messageConstants.BOOKING_DETAILS_NOT_AVAILABLE,
         });
   }else{
   return models.booking_details.update(options,{where:{Id:Id}});
      };
   };
};



 //  Delete
 exports.destroy= async(Id)=>{
   const id= await models.booking_details.findOne({where:{Id:Id}});
   if(!id){
      return Promise.resolve({
         message: messageConstants.BOOKING_DETAILS_ID_NOT_FOUND,
      });
   }else{
   return models.booking_details.destroy({where:{Id:Id}});
   };
};


//  Deleted fake
exports.delete=async (Id,options)=>{
   const id= await models.booking_details.findOne({where:{Id:Id}});
   if(!id){
      return Promise.resolve({
         message: messageConstants.BOOKING_DETAILS_ID_NOT_FOUND,
      });
   }else{
      const deleted= await models.booking_details.findOne({where:{Deleted:1}});
      if(deleted){
         return Promise.resolve({
            message: messageConstants.BOOKING_DETAILS_NOT_AVAILABLE,
         });
   }else{
   return models.booking_details.update(options,{where:{Id:Id,Deleted:0}});
      };
   };
};



// Restore
exports.restore= async(Id,options)=>{
   const id= await models.booking_details.findOne({where:{Id:Id}});
   if(!id){
      return Promise.resolve({
         message: messageConstants.BOOKING_DETAILS_ID_NOT_FOUND,
      });
   }else{
      const deleted= await models.booking_details.findOne({where:{Deleted:1}});
      if(!deleted){
         return Promise.resolve({
            message: messageConstants.BOOKING_DETAILS_NOT_AVAILABLE,
         });
   }else{
  return  models.booking_details.update(options,{where:{Id:Id,Deleted:1}});
       }
   }
};

   
