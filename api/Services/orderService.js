const models = require("../../models");
const bcrypt = require("bcryptjs");
const messageConstants = require("../constant/messageConstants");

// Create
exports.create = async (orders) => {
  return models.orders.create(orders);
};

// Find All
exports.get = async () => {
  return models.orders.findAndCountAll();
};

// Find All by paging
exports.getallpaging = async (searchViewModel) => {
  const limit = searchViewModel.limit;
  const offset = searchViewModel.offset;
  return models.orders.findAndCountAll({
    limit: limit,
    offset: offset,
  });
};

// Order-Details
exports.getOderDetails = () => {
  let condition = { Deleted: 0 };
  models.orders.hasMany(models.order_details);
  models.order_details.belongsTo(models.orders);
  return models.orders.findAll({
    where: condition,
    include: [
      {
        model: models.order_details,
      },
    ],
  });
};

// // Order-Details
exports.getOderDetailsId = (req) => {
   let condition = { Deleted: 0 };
   models.orders.hasMany(models.order_details);
   models.order_details.belongsTo(models.orders);
   return models.orders.findAll({
     where: condition,
     where: {Status: req.Status},
     include: [
       {
         model: models.order_details,
       },
     ],
   });
 };

// FindById and orderdetails
exports.getbyID = async (Id) => {
  models.orders.hasMany(models.order_details);
  models.order_details.belongsTo(models.orders);
  return models.orders.findOne({
    include: [
      {
        model: models.order_details,
      },
    ],
    where: { Id: Id },
  });
};

// Update
exports.update = async (Id, orderUpdate) => {
  const id = await models.orders.findOne({ where: { Id: Id } });
  if (!id) {
    return Promise.resolve({
      message: messageConstants.ORDERS_ID_NOT_FOUND,
    });
  } else {
    const deleted = await models.orders.findOne({ where: { Deleted: 1 } });
    if (deleted) {
      return Promise.resolve({
        message: messageConstants.ORDERS_NOT_AVAILABLE,
      });
    } else {
      return models.orders.update(orderUpdate, { where: { Id: Id } });
    }
  }
};

//  Delete
exports.destroy = async (Id) => {
  const id = await models.orders.findOne({ where: { Id: Id } });
  if (!id) {
    return Promise.resolve({
      message: messageConstants.ORDERS_ID_NOT_FOUND,
    });
  }
  return models.orders.destroy({ where: { Id: Id } });
};

//  Deleted fake
exports.delete = async (Id, options) => {
  const id = await models.orders.findOne({ where: { Id: Id } });
  if (id) {
    const deleted = await models.orders.findOne({ where: { Deleted: 1 } });
    if (deleted === null) {
      return models.orders.update(options, { where: { Id: Id, Deleted: 0 } });
    } else {
      return Promise.resolve({
        message: messageConstants.ORDERS_NOT_AVAILABLE,
      });
    }
  } else {
    return Promise.resolve({
      message: messageConstants.ORDERS_ID_NOT_FOUND,
    });
  }
};

// Restore
exports.restore = async (Id, options) => {
  const id = await models.orders.findOne({ where: { Id: Id } });
  if (!id) {
    return Promise.resolve({
      message: messageConstants.ORDERS_ID_NOT_FOUND,
    });
  } else {
    const deleted = await models.orders.findOne({ where: { Deleted: 1 } });
    if (!deleted) {
      return Promise.resolve({
        message: messageConstants.ORDERS_NOT_AVAILABLE,
      });
    } else {
      models.orders.update(options, { where: { Id: Id, Deleted: 1 } });
    }
  }
};
