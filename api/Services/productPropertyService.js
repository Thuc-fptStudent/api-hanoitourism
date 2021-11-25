const messageConstants = require('../constant/messageConstants');
const models= require('../../models');

// get all
exports.get= function (){
    return  models.productProperty.findAndCountAll();
};  

// get by id
exports.getbyID = async(Id)=>{
    return models.productProperty.findOne({where:{Id:Id}});
}

//pagination
exports.getallpaging = function (searchViewModel){
    limit= searchViewModel.limit;
    offset= searchViewModel.offset;
    return models.productProperty.findAndCountAll({
        limit: limit,
        offset: offset
    });
};

// Create
exports.create=async(productProperty)=>{
    return models.productProperty.create(productProperty);
};

// Update
exports.update= async(Id,productPropertyUpdate)=>{
    const id = await models.productProperty.findOne({where:{Id:Id}});
    if(!id){
        return Promise.resolve({
            message: messageConstants.PRODUCT_PROPERTY_ID_NOT_FOUND,
        });
    }else{
        const deleted= await models.productProperty.findOne({where:{Deleted:1}});
        if(deleted){
            return Promise.resolve({
                message: messageConstants.PRODUCT_PROPERTY_NOT_AVAILABLE,
            });
        }else{
            return models.productProperty.update(productPropertyUpdate,{where:{Id:Id}});
        };
    }
};

//DELETE
exports.destroy= async (Id) =>{
    const id = await models.productProperty.findOne({where:{Id:Id}});
    if(!id){
        return Promise.resolve({
            message: messageConstants.PRODUCT_PROPERTY_ID_NOT_FOUND,
        });
    }else{
        return models.productProperty.destroy({where:{Id:Id}});
    };
};