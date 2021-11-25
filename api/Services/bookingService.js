const models = require("../../models");
const bcrypt = require("bcryptjs");
const messageConstants = require("../constant/messageConstants");
const Paginatior = require("../commons/paginator");

// Create
exports.create = async (bookings) => {
    return models.bookings.create(bookings);
};

// Find All
exports.get = () => {
  return models.bookings.findAndCountAll();
};

// get Type
exports.getType = (req) => {
  let condition = { Deleted: 0 };
  return models.bookings.findAll({
    where: condition,
    where: { Type: req.Type },
  });
};

// Find All By Paging
exports.getallpaging = (searchViewModel) => {
  limit = searchViewModel.limit;
  offset = searchViewModel.offset;
  return models.bookings.findAndCountAll({
    limit: limit,
    offset: offset,
  });
};

// Find combine
exports.getcombine = (req, res) => {
  models.bookings.hasMany(models.booking_details);
  models.booking_details.belongsTo(models.bookings);
  models.booking_details.hasMany(models.products, { foreignKey: "id" });
  models.products.belongsTo(models.booking_details, {
    foreignKey: "ProductId",
  });
  return models.bookings.findAll({
    include: [
      {
        model: models.booking_details,
        attributes: [
          "Id",
          "BookingId",
          "ProductId",
          "Price",
          "Description",
          "CreatedDate",
          "CreatedBy",
          "UpdatedDate",
          "UpdatedBy",
        ],
        include: [
          {
            model: models.products,
            attributes: [
              "Name",
              "Description",
              "Content",
              "ParentId",
              "ImageUrl",
              "Price",
            ],
          },
        ],
      },
    ],
  });
};

// FindById
exports.getbyID = async (Id) => {
  return models.bookings.findOne({ where: { Id: Id } });
};

// Update
exports.update = async (Id, bookingsUpdate) => {
  const id = await models.bookings.findOne({ where: { Id: Id } });
  if (!id) {
    return Promise.resolve({
      message: messageConstants.BOOKINGS_ID_NOT_FOUND,
    });
  } else {
    const deleted = await models.bookings.findOne({ where: { Deleted: 1 } });
    if (deleted) {
      return Promise.resolve({
        message: messageConstants.BOOKINGS_NOT_AVAILABLE,
      });
    } else {
      return models.bookings.update(bookingsUpdate, { where: { Id: Id } });
    }
  }
};

//  Delete
exports.destroy = async (Id) => {
  const id = await models.bookings.findOne({ where: { Id: Id } });
  if (!id) {
    return Promise.resolve({
      message: messageConstants.BOOKINGS_ID_NOT_FOUND,
    });
  } else {
    models.bookings.destroy({ where: { Id: Id } });
  }
};

//  Deleted fake
exports.delete = async (Id, options) => {
  return models.bookings.update(options, { where: { Id: Id, Deleted: 0 } });
};

// Restore
exports.restore = async (Id, options) => {
  return models.bookings.update(options, { where: { Id: Id, Deleted: 1 } });
};

// Paging by Type
// exports.getPagingFilter= (req,res)=>{
//    let options={
//       model: models.bookings,
//       require: false,
//       include:[{
//          model: models.order_details,
//          attributes: ['Id','StartId','ProductId','Price','Content'],
//          require: false,
//          on:{
//             'Id':{
//                [Op.eq]:Sequelize.col('bookings->Id')
//             },
//             'StartId':{
//                [Op.eq]: Sequelize.col('bookings.StartId')
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
//             CustomerId: {
//                [Op.like]: "%" + req.query.filter + "%",
//              },
//            StartDate: {
//              [Op.like]: "%" + req.query.filter + "%",
//            },
//            Description: {
//              [Op.like]: "%" + req.query.filter + "%",
//            },
//            StoreId: {
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
//      models.bookings.findAndCountAll({
//       options
//     }).then(async(data)=>{
//        const response = Paginatior.getPagingData(data, page, limit);
//            res.status(200).json({
//            message:messageConstants.BOOKINGS_FOUND,
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
