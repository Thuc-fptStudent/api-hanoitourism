const models = require("../../models");
const bcrypt = require("bcryptjs");
const messageConstants = require("../constant/messageConstants");

// Create
exports.create = async (image) => {
  return models.image.create(image);
};

// Find All
exports.getallpaging = (searchViewModel) => {
  limit = searchViewModel.limit;
  offset = searchViewModel.offset;
  return models.image.findAndCountAll({
    limit: limit,
    offset: offset,
  });
};
// Find All
exports.get = () => {
  return models.image.findAndCountAll({ where: { deleted: false } });
};

// FindById
exports.getbyID = async (Id) => {
  return models.image.findOne({ where: { Id: Id } });
};

// Update
exports.update = async (Id, imageUpdate) => {
  return models.image.update(imageUpdate, { where: { Id: Id } });
};

//  Delete
// exports.destroy = async (Id) => {
//   const product = await models.products.findOne({ where: { Id: Id } });
//   if (product === null) {
//     return Promise.resolve({
//       message: messageConstants.PRODUCT_NOT_EXIST,
//     });
//   } else {
//     return models.products.destroy({ where: { Id: Id } });
//   }
// };

//  Deleted fake
exports.delete = async (Id, options) => {
  return models.image.update(options, { where: { Id: Id, Deleted: 0 } });
};

// Restore
exports.restore = async (Id, options) => {
  return models.image.update(options, { where: { Id: Id, Deleted: 1 } });
};
