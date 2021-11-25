const models= require('../../models');
const bcrypt = require('bcryptjs');
const messageConstants = require('../constant/messageConstants');


// Create
exports.create=async(news)=>{
    return  models.news.create(news);
};

// Find All
exports.get= ()=>{
    return  models.news.findAndCountAll();
};
   
// Find All
exports.getallpaging= (searchViewModel)=>{
    limit= searchViewModel.limit;
    offset= searchViewModel.offset;
    return  models.news.findAndCountAll({ 
        limit: limit,
        offset: offset
    });
};



// FindById
exports.getbyID = async(Id)=>{
    return models.news.findOne({where:{Id:Id}});
};
    
    
// Update 
exports.update=async(Id,newsUpdate)=>{
const id= await models.news.findOne({where:{Id:Id}});
    if(!id){
        return Promise.resolve({
        message:  messageConstants.NEWS_ID_NOT_FOUND,
            });
      }else{
        const deleted= await models.news.findOne({where:{Deleted:0}});
        if(deleted){
            return models.news.update(newsUpdate,{where:{Id:Id}})
        }else{
              return Promise.resolve({
              message:  messageConstants.NEWS_NOT_AVAILABLE,
                  });
          };
    };
};



//  Delete
exports.destroy= async(Id)=>{
    const id= await models.news.findOne({where:{Id:Id}});
    if(!id){
        return Promise.resolve({
            message: messageConstants.NEWS_NOT_AVAILABLE,
        });
    }else{
    return models.news.destroy({where:{Id:Id}})
    }
};


//  Deleted fake
exports.delete= async(Id,options)=>{
    const id= await models.news.findOne({where:{Id:Id}});
    if(!id){
        return Promise.resolve({
            message: messageConstants.NEWS_ID_NOT_FOUND,
        });
    }else{
        const deleted= await models.news.findOne({where:{Deleted:1}});
        if(deleted){
            return Promise.resolve({
            message: messageConstants.NEWS_NOT_AVAILABLE,
            });
        }else{
    return models.news.update(options,{where:{Id:Id,Deleted:0}})
        };
    };
};



// Restore
exports.restore= async(Id,options)=>{
    const id= await models.news.findOne({where:{Id:Id}});
    if(!id){
        return Promise.resolve({
            message: messageConstants.NEWS_ID_NOT_FOUND,
        });
    }else{
        const deleted= await models.news.findOne({where:{Deleted:1}});
        if(!deleted){
            return Promise.resolve({
            message: messageConstants.NEWS_NOT_AVAILABLE,
            });
        }else{
   return models.news.update(options,{where:{Id:Id,Deleted:1}})
            };
        };
    };
