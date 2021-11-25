const models= require('../../models');
const bcrypt = require('bcryptjs');
const messageConstants = require('../constant/messageConstants');


// Create
exports.create=async(notifications)=>{
    // save data
    return models.notifications.create(notifications);
};

// Find All
exports.get= ()=>{
    return models.notifications.findAndCountAll();
};
   
// Find All By Paging
exports.getallpaging= (searchViewModel)=>{
    limit= searchViewModel.limit;
    offset= searchViewModel.offset;
    return models.notifications.findAndCountAll({ 
        limit: limit,
        offset: offset
    });
};



// FindById
exports.getbyID = async(Id)=>{
    await models.notifications.findOne({where:{Id:Id}});
};
    
    
// Update 
exports.update=async(Id,notificationUpdate)=>{
        const id= await models.notifications.findOne({where:{Id:Id}});
            if(!id){
                return Promise.resolve({
                    message: messageConstants.NOTIFICATION_ID_NOT_FOUND,
                })
            }else{
                const deleted= await models.notifications.findOne({where:{Deleted:1}});
                if(deleted){
                    return Promise.resolve({
                        message: messageConstants.NOTIFICATION_NOT_AVAILABLE,
                        });
                    }
                }
        return models.notifications.update(notificationUpdate,{where:{Id:Id}});
};



//  Delete
exports.destroy= (Id)=>{
  return  models.notifications.destroy({where:{Id:Id}});
};


//  Deleted fake
exports.delete= async(Id,options)=>{
const id= await models.notifications.findOne({where:{Id:Id}});
if(!id){
    return Promise.resolve({
        message: messageConstants.NOTIFICATION_ID_NOT_FOUND,
    });
}else{
    const deleted= await models.notifications.findOne({where:{Deleted:1}});
    if(deleted){
        return Promise.resolve({
            message: messageConstants.NOTIFICATION_NOT_AVAILABLE,
            });
        }
    }
        return models.notifications.update(options,{where:{Id:Id,Deleted:0}});
};



// Restore
exports.restore= async(Id,options)=>{
    const id= await models.notifications.findOne({where:{Id:Id}});
if(!id){
    return Promise.resolve({
        message: messageConstants.NOTIFICATION_ID_NOT_FOUND,
    });
}else{
    const deleted= await models.notifications.findOne({where:{Deleted:1}});
    if(!deleted){
        return Promise.resolve({
            message: messageConstants.NOTIFICATION_NOT_AVAILABLE,
            });
        }
    }
   return models.notifications.update(options,{where:{Id:Id,Deleted:1}})
};
  