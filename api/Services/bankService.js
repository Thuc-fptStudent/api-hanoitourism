const models = require("../../models");


// Create
exports.create = async (bank) => {
  return models.bank.create(bank);
};

// Find All
exports.getAll = () => {
  return models.bank.findAndCountAll({where: {Deleted: false}});
};

// Find All By Paging
exports.getallpaging = (searchViewModel) => {
  limit = searchViewModel.limit;
  offset = searchViewModel.offset;
  return models.bank.findAndCountAll({
    limit: limit,
    offset: offset,
  });
};



// FindById
exports.getbyID = async (Id) => {
  return models.bank.findOne({ where: { Id: Id } });
};

// Update
exports.update = async (Id, bankUpdate) => {
  return models.bank.update(bankUpdate, { where: { Id: Id } });
};


//  Deleted fake
exports.delete = async (Id, options) => {
  return models.bank.update(options, { where: { Id: Id, Deleted: 0 } });
};

// Restore
exports.restore = async (Id, options) => {
  return models.bank.update(options, { where: { Id: Id, Deleted: 1 } });
};

