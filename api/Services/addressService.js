const models = require("../../models");


// Create
exports.create = async (address) => {
  return models.address.create(address);
};

// Find All
exports.get = () => {
  return models.address.findAndCountAll();
};

// Find All By Paging
exports.getallpaging = (searchViewModel) => {
  limit = searchViewModel.limit;
  offset = searchViewModel.offset;
  return models.address.findAndCountAll({
    limit: limit,
    offset: offset,
  });
};



// FindById
exports.getbyID = async (Id) => {
  return models.address.findOne({ where: { Id: Id } });
};

// Update
exports.update = async (Id, addressUpdate) => {
  return models.address.update(addressUpdate, { where: { Id: Id } });
};


//  Deleted fake
exports.delete = async (Id, options) => {
  return models.address.update(options, { where: { Id: Id, Deleted: 0 } });
};

// Restore
exports.restore = async (Id, options) => {
  return models.address.update(options, { where: { Id: Id, Deleted: 1 } });
};
