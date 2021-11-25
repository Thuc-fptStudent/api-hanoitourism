const models= require('../../models');
const bcrypt = require('bcryptjs');
const messageConstants = require('../constant/messageConstants');
const Paginatior = require('../commons/paginator');


// Create
exports.create=async(functions)=>{
    return  models.functions.create(functions);
};
   
   
   // Find All
exports.get= ()=>{
    return  models.functions.findAll({ 
    });
};

// Find All
exports.getallpaging= (searchViewModel)=>{
  limit= searchViewModel.limit;
  offset= searchViewModel.offset;
 return models.functions.findAndCountAll({ 
     limit: limit,
     offset: offset
  });
};


// FindById
exports.getbyID = async(Id)=>{
    return models.functions.findOne({where:{Id:Id}});
};

// Update 
exports.update=async(Id,functionUpdate)=>{
const id= await models.functions.findOne({where:{Id: Id}});
        if(!id){
            return Promise.resolve({
            message:  messageConstants.FUNCTION_ID_NOT_FOUND,
        });
      }else{
        const Deleted= await models.functions.findOne({where:{Deleted: 1}});
        if(Deleted){
            return Promise.resolve({
            message:  messageConstants.FUNCTION_NOT_AVAILABLE,
        });
      }else{
        await models.functions.update(functionUpdate,{where:{Id:Id}});
      };
    };
};



//  Delete
exports.destroy=async (Id)=>{
    const id= await models.functions.findOne({where:{Id: Id}});
    if(!id){
        return Promise.resolve({
        message:  messageConstants.FUNCTION_ID_NOT_FOUND,
    });
  }else{
  return  models.functions.destroy({where:{Id:Id}});
  };
};


//  Deleted fake
exports.delete=async (Id,options)=>{
    const id= await models.functions.findOne({where:{Id: Id}});
        if(!id){
            return Promise.resolve({
            message:  messageConstants.FUNCTION_ID_NOT_FOUND,
        });
      }else{
        const deleted= await models.functions.findOne({where:{Deleted: 0}});
        if(!deleted){
            return Promise.resolve({
            message:  messageConstants.FUNCTION_NOT_AVAILABLE,
        });
      }else{
return models.functions.update(options,{where:{Id:Id,Deleted:0}});
      };
    };
};



// Restore
exports.restore= async(Id,options)=>{
    const id= await models.functions.findOne({where:{Id: Id}});
        if(!id){
            return Promise.resolve({
            message:  messageConstants.FUNCTION_ID_NOT_FOUND,
        });
      }else{
        const deleted= await models.functions.findOne({where:{Deleted: 1}});
        if(!deleted){
            return Promise.resolve({
            message:  messageConstants.FUNCTION_NOT_AVAILABLE,
        });
      }else{
    return models.functions.update(options,{where:{Id:Id,Deleted:1}});
      };
    };
};
    
   
  