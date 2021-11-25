const models= require('../../models');
const bcrypt = require('bcryptjs');
const messageConstants = require('../constant/messageConstants');
const Paginatior = require('../commons/paginator');
const { Sequelize} = require('sequelize');


// Create
exports.create=async(role)=>{
    // save orders
    return models.roles.create(role);
};
   
   
// API get all roles have modules and their functions
   exports.getcombine=()=>{        
        models.roles.belongsToMany(models.modules,{through: models.permissions, foreignKey: 'RoleId'});
        models.modules.belongsToMany(models.roles,{through: models.permissions, foreignKey: 'ModuleId'});
        models.modules.hasMany(models.functions, {foreignKey: 'ParentId'});
        models.functions.belongsTo(models.modules,{foreignKey: 'ParentId'});
        return models.roles.findAll({
        attributes:['Id','Name','Description'],
        include:[{
            model: models.modules,
            attributes:['Name','Url','Description','ParentId','Icon'],
            include:[{
                model :models.functions,
                attributes:['Name','Description','ParentId','Icon']
            }]
        }]
    });
};

 // API get all roles have modules 
 exports.getModules= async()=>{     
    models.roles.belongsToMany(models.modules,{through: models.permissions,foreignKey: 'RoleId'});
    models.modules.belongsToMany(models.roles,{through:models.permissions,foreignKey: 'ModuleId'});
    return models.roles.findAll({
    attributes:['Id','Name','Description'],
    include:[{
        model: models.modules,
        attributes:['Name','Url','Description','ParentId','Icon'],
        }]
    });
};


// get all
exports.get= ()=>{
  return  models.roles.findAndCountAll({})
};


// get all by paging
exports.getallpaging= (searchViewModel)=>{
    limit= searchViewModel.limit;
    offset= searchViewModel.offset;
    return  models.roles.findAndCountAll({
         limit: limit,
         offset: offset,
   })
};
  

// FindById
exports.getbyID = async(Id)=>{
   return models.roles.findOne({where:{Id:Id}});
    };
    
    
// Update 
    exports.update=async(Id,roleUpdate)=>{
        const id= await models.roles.findOne({where:{Id:Id}});
        if(!id){
            return Promise.resolve({
               message: messageConstants.ROLE_ID_NOT_EXIST ,
            });
         }else{
            const deleted= await models.roles.findOne({where:{Deleted:1}});
            if(deleted){
               return Promise.resolve({
                  message: messageConstants.ROLE_NOT_EXIST ,
            });
         }else{
        return models.roles.update(roleUpdate,{where:{Id:Id}});
             }
        };
};



//  Delete
exports.destroy=async (Id)=>{
    const role=await models.roles.findOne({where:{Id:Id}});
        if(role===null){
            return Promise.resolve({
                message:messageConstants.ROLE_NOT_EXIST,
            });
        }else{
    return models.roles.destroy({where:{Id:Id}});
        };
};


//  Deleted fake
exports.delete= async(Id,options)=>{
    const id= await models.roles.findOne({where:{Id:Id}});
    if(!id){
        return Promise.resolve({
           message: messageConstants.ROLE_ID_NOT_EXIST ,
        });
     }else{
        const deleted= await models.roles.findOne({where:{Deleted:1}});
        if(deleted){
           return Promise.resolve({
              message: messageConstants.ROLE_NOT_EXIST ,
        });
     }else{
 return models.roles.update(options,{where:{Id:Id,Deleted:0}})
        };
    };
};


// Restore
exports.restore= async(Id,options)=>{
    const id= await models.roles.findOne({where:{Id:Id}});
    if(!id){
        return Promise.resolve({
           message: messageConstants.ROLE_ID_NOT_EXIST ,
        });
     }else{
        const deleted= await models.roles.findOne({where:{Deleted:1}});
        if(!deleted){
           return Promise.resolve({
              message: messageConstants.ROLE_NOT_EXIST ,
        });
     }else{
       return  models.roles.update(options,{where:{Id:Id,Deleted:1}})
        }
   };
};

