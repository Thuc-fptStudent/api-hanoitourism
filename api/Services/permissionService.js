const models= require('../../models');
const bcrypt = require('bcryptjs');
const messageConstants = require('../constant/messageConstants');


// Create
exports.create=async(permission)=>{
    return models.permissions.create(permission);
};

// Find All
exports.get= ()=>{
    return models.permissions.findAndCountAll();
};

   
// Find All By Paging
   exports.getallpaging= (searchViewModel)=>{
    limit= searchViewModel.limit;
    offset= searchViewModel.offset;
    return models.permissions.findAndCountAll({
        limit: limit,
        offset: offset,
  });
};

// Find All  Paging By RoleId
exports.getallpagingRoleId= (searchViewModel)=>{
    limit= searchViewModel.limit;
    offset= searchViewModel.offset;
    return models.permissions.findAndCountAll({
        where: {RoleId:searchViewModel.RoleId},
        limit: limit,
        offset: offset,
  });
};



// FindById
exports.getbyID = async(Id)=>{
    return models.permissions.findOne({where:{Id:Id}});
};

// FindByRoleId
exports.getbyRoleID = async(RoleId)=>{
    return models.permissions.findAndCountAll({where:{RoleId:RoleId}});
};
    
// Update 
exports.update=async(Id,permissionUpdate)=>{
    const id = await models.permissions.findOne({where:{Id:Id}});
    if(!id){
           return Promise.resolve({
             message:  messageConstants.PERMISSION_ID_NOT_EXIST,
          });
        }else{
            const deleted = await models.permissions.findOne({where:{Deleted:1}});
            if(deleted){
                return Promise.resolve({
                  message:  messageConstants.PERMISSION_NOT_AVAILABLE,
               });
            }else{
        return models.permissions.update(permissionUpdate,{where:{Id:Id}})
            }``
    }
};



//  Delete
exports.destroy=async (Id)=>{
    const id = await models.permissions.findOne({where:{Id:Id}});
   if(!id){
          return Promise.resolve({
            message:  messageConstants.PERMISSION_ID_NOT_EXIST,
         });
        }else{
    return models.permissions.destroy({where:{Id:Id}});
    }
};


//  Deleted fake
exports.delete=async (Id,options)=>{
    const id = await models.permissions.findOne({where:{Id:Id}});
    if(!id){
           return Promise.resolve({
             message:  messageConstants.PERMISSION_ID_NOT_EXIST,
          });
        }else{
            const deleted = await models.permissions.findOne({where:{Deleted:1}});
            if(deleted){
                return Promise.resolve({
                  message:  messageConstants.PERMISSION_NOT_AVAILABLE,
               });
            }else{
                return models.permissions.update(options,{where:{Id:Id,Deleted:0}})
        };
    };
};



// Restore
exports.restore= async(Id,options)=>{
    const id = await models.permissions.findOne({where:{Id:Id}});
    if(!id){
           return Promise.resolve({
             message:  messageConstants.PERMISSION_ID_NOT_EXIST,
          });
         }else{
            const deleted = await models.permissions.findOne({where:{Deleted:1}});
            if(!deleted){
                return Promise.resolve({
                  message: messageConstants.PERMISSION_NOT_AVAILABLE,
               });
            }else{
        return models.permissions.update(options,{where:{Id:Id,Deleted:1}});
        };
    };
};
    
   
    // Paging by Type
    // exports.getPagingFilter= (req,res)=>{
    //    let options={
    //       model: models.permissions,
    //       require: false,
    //       include:[{
    //          model: models.order_details,
    //          attributes: ['Id','OrderId','ProductId','Price','Content'],
    //          require: false,
    //          on:{
    //             'Id':{
    //                [Op.eq]:Sequelize.col('permissions->Id')
    //             },
    //             'OrderId':{
    //                [Op.eq]: Sequelize.col('permissions.OrderId')
    //             },
    //          }
    //       }]
    //    };
    //    if (req.query.filter) {
    //       options.where = {
    //          [Op.or]: [{
    //             Id: {
    //                [Op.like]: "%" + req.query.filter + "%",
    //              },
    //             Content: {
    //                [Op.like]: "%" + req.query.filter + "%",
    //              },
    //            Phone: {
    //              [Op.like]: "%" + req.query.filter + "%",
    //            },
    //            Shopee: {
    //              [Op.like]: "%" + req.query.filter + "%",
    //            },
    //            RoleId: {
    //              [Op.like]: "%" + req.query.filter + "%",
    //            }
    //          }]
    //        };
    // if (req.query.sort) {
    //          options.order = [['id', req.query.sort || 'DESC']];
    //      }
    //    // const  page = parseInt(req.query.page);
    //    // const  size = parseInt(req.query.zise);
    //    if (req.query.page && req.query.size){
    //       options.offset = req.query.page * req.query.size;
    //       options.limit = parseInt(req.query.page, 10) + parseInt(req.query.size, 10);
    //   }
    //   console.log(options);
    // //   { options.limit, options.offset } = Paginatior.getPagination(page, size);
    //    console.log(filter,limit,offset);
    //      models.permissions.findAndCountAll({
    //       options 
    //     }).then(async(data)=>{
    //        const response = Paginatior.getPagingData(data, page, limit);
    //            res.status(200).json({
    //            message:messageConstants.USER_FOUND,
    //            data:response
    //             });
    //       }).catch(err =>{
    //          res.send({
    //            error:{
    //              status: err.status ||500,
    //              message: err.message
    //            },
    //          })
    //       });
    // };
    // }
