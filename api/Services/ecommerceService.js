const models = require("../../models");
const messageConstants = require("../constant/messageConstants");

//create
exports.create = async (ecommerce) => {
  return models.ecommerces.create(ecommerce);
};

//find all
exports.getAll = () => {
  return models.ecommerces.findAndCountAll({ where: { deleted: false } });
};

//find all paging
exports.getallpaging = (searchViewModel) => {
  limit = searchViewModel.limit;
  offset = searchViewModel.offset;
  return models.ecommerces.findAndCountAll({
    limit: limit,
    offset: offset,
    where: { deleted: false },
  });
};

//Findbyid
exports.getById = async (Id) => {
  return models.ecommerces.findOne({ where: { Id: Id } });
};

//update
exports.update = async (Id, ecommerceUpdate) => {
  return models.ecommerces.update(ecommerceUpdate, { where: { Id: Id } });
};

//delete
exports.destroy = async (Id) => {
  return models.ecommerces.destroy({ where: { Id: Id } });
};

//soft delete
exports.delete = (Id, options) => {
  return models.ecommerces.update(options, { where: { Id: Id, Deleted: 0 } });
};

//restore
exports.restore = async (Id, options) => {
  return models.ecommerces.update(options, { where: { Id: Id, Deleted: 1 } });
};

//photo
// exports.photo = () => {
//   return models.ecommerces.findAll();
// }
