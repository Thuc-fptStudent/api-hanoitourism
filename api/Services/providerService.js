const models = require("../../models");
const bcrypt = require("bcryptjs");
const messageConstants = require("../constant/messageConstants");

// Create
exports.create = async (provider) => {
  const Name = await models.providers.findOne({
    where: { Name: provider.Name },
  });
  if (Name) {
    return Promise.resolve({
      message: messageConstants.PROVIDER_EXIST_NAME,
    });
  } else {
    // save data
    return models.providers.create(provider);
  }
};

// Find All By Paging
exports.getallpaging = (searchViewModel) => {
  limit = searchViewModel.limit;
  offset = searchViewModel.offset;
  return models.providers.findAndCountAll({
    limit: limit,
    offset: offset,
  });
};

// Find All
exports.get = () => {
  return models.providers.findAndCountAll({});
};

// FindById
exports.getbyID = (Id) => {
  return models.providers.findOne({ where: { Id: Id } });
};

// Update
exports.update = async (Id, providerUpdate) => {
  const id = await models.providers.findOne({ where: { Id: Id } });
  if (!id) {
    return Promise.resolve({
      message: messageConstants.PROVIDER_ID_NOT_FOUND,
    });
  } else {
    const deleted = await models.providers.findOne({ where: { Deleted: 1 } });
    if (deleted) {
      return Promise.resolve({
        message: messageConstants.PROVIDER_NOT_AVAILABLE,
      });
    } else {
      return models.providers.update(providerUpdate, { where: { Id: Id } });
    }
  }
};

//  Delete
exports.destroy = async (Id) => {
  const provider = await models.providers.findOne({ where: { Id: Id } });
  if (provider === null) {
    return Promise.resolve({
      message: messageConstants.PROVIDER_NOT_EXIST,
    });
  } else {
    return models.providers.destroy({ where: { Id: Id } });
  }
};

//  Deleted fake
exports.delete = async (Id, options) => {
  const id = await models.providers.findOne({ where: { Id: Id } });
  if (!id) {
    return Promise.resolve({
      message: messageConstants.PROVIDER_ID_NOT_FOUND,
    });
  } else {
    const deleted = await models.providers.findOne({ where: { Deleted: 1 } });
    if (deleted) {
      return Promise.resolve({
        message: messageConstants.PROVIDER_NOT_AVAILABLE,
      });
    } else {
      return models.providers.update(options, {
        where: { Id: Id, Deleted: 0 },
      });
    }
  }
};

// Restore
exports.restore = async (Id, options) => {
  const id = await models.providers.findOne({ where: { Id: Id } });
  if (!id) {
    return Promise.resolve({
      message: messageConstants.PROVIDER_ID_NOT_FOUND,
    });
  } else {
    const deleted = await models.providers.findOne({ where: { Deleted: 1 } });
    if (!deleted) {
      return Promise.resolve({
        message: messageConstants.PROVIDER_NOT_AVAILABLE,
      });
    } else {
      return models.providers.update(options, {
        where: { Id: Id, Deleted: 1 },
      });
    }
  }
};

// Paging by Type
// exports.getPagingFilter= (req,res)=>{
//    let options={
//       model: models.providers,
//       require: false,
//       include:[{
//          model: models.order_details,
//          attributes: ['Id','OrderId','ProductId','Price','Content'],
//          require: false,
//          on:{
//             'Id':{
//                [Op.eq]:Sequelize.col('providers->Id')
//             },
//             'OrderId':{
//                [Op.eq]: Sequelize.col('providers.OrderId')
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
//            Email: {
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
//      models.providers.findAndCountAll({
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
