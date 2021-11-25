const messageConstants = require('../constant/messageConstants');
const models= require('../../models');

// get all
exports.get= function (){
    return  models.productFeature.findAndCountAll();
};  

// get by id
exports.getbyID = async(Id)=>{
    return models.productFeature.findOne({where:{Id:Id}});
}

//pagination
exports.getallpaging = function (searchViewModel){
    limit= searchViewModel.limit;
    offset= searchViewModel.offset;
    return models.productFeature.findAndCountAll({
        limit: limit,
        offset: offset
    });
};

// Create
exports.create=async(productFeature)=>{
    return models.productFeature.create(productFeature);
};

// Update
exports.update= async(Id,productFeatureUpdate)=>{
    const id = await models.productFeature.findOne({where:{Id:Id}});
    if(!id){
        return Promise.resolve({
            message: messageConstants.PRODUCT_FEATURE_ID_NOT_FOUND,
        });
    }else{
        const deleted= await models.productFeature.findOne({where:{Deleted:1}});
        if(deleted){
            return Promise.resolve({
                message: messageConstants.PRODUCT_FEATURE_NOT_AVAILABLE,
            });
        }else{
            return models.productFeature.update(productFeatureUpdate,{where:{Id:Id}});
        };
    }
};
//DELETE
exports.destroy= async (Id) =>{
    const id = await models.productFeature.findOne({where:{Id:Id}});
    if(!id){
        return Promise.resolve({
            message: messageConstants.PRODUCT_FEATURE_ID_NOT_FOUND,
        });
    }else{
        return models.productFeature.destroy({where:{Id:Id}});
    };
};