const models = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const messageConstants = require("../constant/messageConstants");
const Paginatior = require("../commons/paginator");

//Create
exports.create = async (ward) => {
  return models.ward.create(ward);
};

// Find All
exports.getAll = () => {
  return models.ward.findAndCountAll({where: {Deleted: false}});
};

// Find All Paging
exports.getallpaging = (searchViewModel) => {
  limit = searchViewModel.limit;
  offset = searchViewModel.offset;
  return models.ward.findAndCountAll({
    limit: limit,
    offset: offset,
  });
};

// FindById
exports.getbyID = async (Id) => {
  return models.ward.findOne({ where: { Id: Id } });
};

// Update
exports.update = async (Id, options) => {
  return models.ward.update(options, { where: { Id: Id } });
};

//  Deleted fake
exports.delete = async (Id, options) => {
  return models.ward.update(options, { where: { Id: Id, Deleted: 0 } });
};

// Restore
exports.restore = async (Id, options) => {
  return models.ward.update(options, { where: { Id: Id, Deleted: 1 } });
};


