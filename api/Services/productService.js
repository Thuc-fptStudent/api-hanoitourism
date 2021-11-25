const models = require("../../models");
const bcrypt = require("bcryptjs");
const messageConstants = require("../constant/messageConstants");

// Create
exports.create = async (product) => {
  return models.products.create(product);
};

// Find All
exports.getallpaging = (searchViewModel) => {
  limit = searchViewModel.limit;
  offset = searchViewModel.offset;
  return models.products.findAndCountAll({
    limit: limit,
    offset: offset,
  });
};
// Find All
exports.get = () => {
  return models.products.findAndCountAll();
};

// FindById
exports.getbyID = async (Id) => {
  return models.products.findOne({ where: { Id: Id } });
};

// Update
exports.update = async (Id, productUpdate) => {
  return models.products.update(productUpdate, { where: { Id: Id } });
};

//  Delete
exports.destroy = async (Id) => {
  const product = await models.products.findOne({ where: { Id: Id } });
  if (product === null) {
    return Promise.resolve({
      message: messageConstants.PRODUCT_NOT_EXIST,
    });
  } else {
    return models.products.destroy({ where: { Id: Id } });
  }
};

//  Deleted fake
exports.delete = async (Id, options) => {
  return models.products.update(options, { where: { Id: Id, Deleted: 0 } });
};

// Restore
exports.restore = async (Id, options) => {
  return models.products.update(options, { where: { Id: Id, Deleted: 1 } });
};

//get cate
exports.getCate = () => {
  models.products.hasMany(models.categories);
  models.categories.belongsTo(models.products, { foreignKey: "categoryId" });
  return models.products.findAndCountAll({
    include: [
      {
        model: models.categories,
        attributes: [
          "Id",
          "Name",
          "ImageUrl",
        ],
      },
    ],
  });
}

 //get list products sort store
//  exports.getListStore = () => {
//   models.products.hasMany(models.stores);
//   models.stores.belongsTo(models.products, { foreignKey: "ProductId" });
//   return models.products.findAndCountAll({
//     include: [
//       {
//         model: models.stores,
//         attributes: [
//           "Id",
//           "Name",
//         ],
//       },
//     ],
//   });
// };
