const models = require("../../models");
const bcrypt = require("bcryptjs");
const messageConstants = require("../constant/messageConstants");
const Paginatior = require("../commons/paginator");

// Create

exports.create = async (categories) => {
  return models.categories.create(categories);
};

//get-all
exports.getAll = () => {
  return models.categories.findAndCountAll({ where: { Deleted: false } });
};

//get all categories cuisine
exports.getAllCuisine = () => {
  let condition = { Deleted: false };
  return models.categories.findAndCountAll({
    where: condition,
    where: { ParentId: 3 },
  });
};

// Find All
exports.getallpaging = (searchViewModel) => {
  limit = searchViewModel.limit;
  offset = searchViewModel.offset;
  return models.categories.findAndCountAll({
    limit: limit,
    offset: offset,
  });
};

// FindById
exports.getbyID = async (Id) => {
  return models.categories.findOne({ where: { Id: Id } });
};

// Update
exports.update = async (Id, productUpdate) => {
  return models.categories.update(productUpdate, { where: { Id: Id } });
};

//  Deleted fake
exports.delete = async (Id, options) => {
  return models.categories.update(options, { where: { Id: Id, Deleted: 0 } });
};

// Restore
exports.restore = async (Id, options) => {
  models.categories.update(options, { where: { Id: Id, Deleted: 1 } });
};

// API get detail information about products relating with categories
exports.getProducts = (Id) => {
  models.categories.hasMany(models.products);
  models.products.belongsTo(models.categories, { foreignKey: "categoryId" });
  return models.categories.findOne({
    where: { Id: Id },
    include: [
      {
        model: models.products,
        attributes: [
          "Id",
          "Name",
          "Description",
          "ParentId",
          "Content",
          "ImageUrl",
          "Price",
          "categoryId",
        ],
      },
    ],
  });
};

//get list products sort categories
exports.getListProducts = () => {
  models.categories.hasMany(models.products);
  models.products.belongsTo(models.categories, { foreignKey: "categoryId" });
  return models.categories.findAndCountAll({
    include: [
      {
        model: models.products,
        attributes: [
          "Id",
          "Name",
          "Description",
          "ParentId",
          "Content",
          "ImageUrl",
          "Price",
          "categoryId",
        ],
      },
    ],
  });
};

//get bank by categories bank
exports.getListBank = () => {
  models.categories.hasMany(models.bank);
  models.bank.belongsTo(models.categories);
  return models.categories.findAll({
    where: { ParentId: 23 },
    attributes: ["Id", "Name"],
    include: [
      {
        model: models.bank,
        attributes: [
          "Id",
          "Name",
          "Address",
          "OpenTime",
          "CloseTime",
          "Phone",
          "Type",
          "CategoryId",
        ],
      },
    ],
  });
};

//get hospital by ward id
exports.getBank = (Id) => {
  models.categories.hasMany(models.bank);
  models.bank.belongsTo(models.categories);
  return models.categories.findOne({
    where: { ParentId: 23 },
    attributes: ["Id", "Name"],
    where: { Id: Id },
    include: [
      {
        model: models.bank,
        attributes: [
          "Id",
          "Name",
          "Address",
          "OpenTime",
          "CloseTime",
          "Phone",
          "Type",
          "CategoryId",
        ],
      },
    ],
  });
};
