const models = require("../../models");
const bcrypt = require("bcryptjs");
const Paginatior = require("../commons/paginator");

//create
exports.create = async (service) => {
  return models.service.create(service);
};

//get-all
exports.getAll = () => {
  return models.service.findAndCountAll({ where: { deleted: false } });
};

//get by id
exports.getByid = (Id) => {
  return models.service.findOne({ where: { Id: Id } });
};

//get all paging
exports.getAllPaging = (searchViewModel) => {
  limit = searchViewModel.limit;
  offset = searchViewModel.offset;
  return models.service.findAndCountAll({
    limit: limit,
    offset: offset,
  });
};

//update
exports.update = (Id, serUpdate) => {
  return models.service.update(serUpdate, { where: { Id: Id } });
};

//deleted
exports.delete = async (Id, options) => {
  return models.service.update(options, { where: { Id: Id, Deleted: 0 } });
};

//restore
exports.restore = async (Id, options) => {
  return models.service.update(options, { where: { Id: Id, Deleted: 1 } });
};


