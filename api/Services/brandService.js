const messageConstants = require('../constant/messageConstants');
const models= require('../../models');

//get all
exports.get= function (){
    return  models.brands.findAndCountAll();
};  

//get by id
exports.getbyID = async(Id)=>{
    return models.brands.findOne({where:{Id:Id}});
}

//pagination
exports.getallpaging = function (searchViewModel){
    limit= searchViewModel.limit;
    offset= searchViewModel.offset;
    return models.brands.findAndCountAll({
        limit: limit,
        offset: offset
    });
};
// Create
exports.create=async(brands)=>{
    return  models.brands.create(brands);
      };

// update
exports.update=async(Id,brandUpdate)=>{
    const id= await models.brands.findOne({where:{Id:Id}});
    if(!id){
        return Promise.resolve({
            message: messageConstants.BRAND_ID_NOT_FOUND,
        });
    }else{
       const deleted= await  models.brands.findOne({where:{Deleted:1}});
       if(deleted){
           return Promise.resolve({
               message: messageConstants.BRAND_NOT_AVAILABLE,
           });
       }else{
           return models.brands.update(brandUpdate,{where:{Id:Id}});
       };
    };
};

//delete
exports.destroy=async (Id)=>{
    const id= await  models.brands.findOne({where:{Id:Id}});
    if(!id){
        return Promise.resolve({
            message: messageConstants.BRAND_ID_NOT_FOUND,
        });
    }else{
        return  models.brands.destroy({where:{Id:Id}});
    };
};