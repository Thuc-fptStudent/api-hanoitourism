const models= require('../../models');
const bcrypt = require('bcryptjs');
const messageConstants = require('../constant/messageConstants');
const Paginatior = require('../commons/paginator');

// Find All 
exports.get= ()=>{
   return models.modules.findAndCountAll();
};

// Create
exports.create=async(modules)=>{
    return  models.modules.create(modules);
};

// Filter combine
exports.filter= ()=>{
models.modules.hasMany(models.functions, {foreignKey: 'ParentId'});
models.functions.belongsTo(models.modules,{foreignKey: 'ParentId'});
    return  models.modules.findAndCountAll({ 
        include: [{
            model: models.functions, 
          }],
    });
};
// Find All with paging
exports.getallpaging= (searchViewModel)=>{
    limit= searchViewModel.limit;
    offset= searchViewModel.offset;
   return models.modules.findAndCountAll({ 
       limit: limit,
       offset: offset
    });
};



// FindById
exports.getbyID = async(Id)=>{
   return models.modules.findOne({where:{Id:Id}})
    };
    
    
// Update 
exports.update=async(Id,moduleUpdate)=>{
const id= await models.modules.findOne({where:{Id: Id}});
    if(!id){
        return Promise.resolve({
        message:  messageConstants.MODULE_ID_NOT_EXIST,
            });
      }else{
        const deleted= await models.modules.findOne({where:{Deleted: 0}});
        if(!deleted){
            return Promise.resolve({
            message:  messageConstants.MODULE_NOT_AVAILABLE,
                });
          }else{
       return models.modules.update(moduleUpdate,{where:{Id:Id}});
          };
      };
};




//  Delete
exports.destroy=async (Id)=>{
    const id= await models.modules.findOne({where:{Id:Id}});
    if(!id){
        return Promise.resolve({
            message: messageConstants.NEWS_ID_NOT_FOUND,
        });
    }else{
    return models.modules.destroy({where:{Id:Id}});
    };
};


//  Deleted fake
exports.delete=async (Id,options)=>{
    const id= await models.modules.findOne({where:{Id:Id}});
    if(!id){
        return Promise.resolve({
            message: messageConstants.NEWS_ID_NOT_FOUND,
        });
    }else{
        const deleted= await models.modules.findOne({where:{Deleted:1}});
        if(deleted){
            return Promise.resolve({
                message: messageConstants.NEWS_NOT_AVAILABLE,
            });
        }else{
         models.modules.update(options,{where:{Id:Id,Deleted:0}});
        };
    };
};



// Restore
exports.restore= async(Id,options)=>{
    const id= await models.modules.findOne({where:{Id:Id}});
    if(!id){
        return Promise.resolve({
            message: messageConstants.NEWS_ID_NOT_FOUND,
        });
    }else{
        const deleted= await models.modules.findOne({where:{Deleted:1}});
        if(!deleted){
            return Promise.resolve({
                message: messageConstants.NEWS_NOT_AVAILABLE,
            });
        }else{
     return  models.modules.update(options,{where:{Id:Id,Deleted:1}});
            };
        };
};
    
   
    // Paging by Type
    // exports.getPagingFilter= (req,res)=>{
    //    let options={
    //       model: models.modules,
    //       require: false,
    //       include:[{
    //          model: models.order_details,
    //          attributes: ['Id','OrderId','ProductId','Price','Content'],
    //          require: false,
    //          on:{
    //             'Id':{
    //                [Op.eq]:Sequelize.col('modules->Id')
    //             },
    //             'OrderId':{
    //                [Op.eq]: Sequelize.col('modules.OrderId')
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
    //            ParentId: {
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
    //      models.modules.findAndCountAll({
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
