const models = require("../../models");


// Create
exports.create = async (utility) => {
  return models.utility.create(utility);
};

// Find All
exports.getAll = () => {
  return models.utility.findAndCountAll({where: {Deleted: false}});
};

// Find by SOS
exports.getSOS = () => {
  return models.utility.findAndCountAll({where: {Type: 4}});
};

// Find All By Paging
exports.getallpaging = (searchViewModel) => {
  limit = searchViewModel.limit;
  offset = searchViewModel.offset;
  return models.utility.findAndCountAll({
    limit: limit,
    offset: offset,
  });
};



// FindById
exports.getbyID = async (Id) => {
  return models.utility.findOne({ where: { Id: Id } });
};

// Update
exports.update = async (Id, utilityUpdate) => {
  return models.utility.update(utilityUpdate, { where: { Id: Id } });
};


//  Deleted fake
exports.delete = async (Id, options) => {
  return models.utility.update(options, { where: { Id: Id, Deleted: 0 } });
};

// Restore
exports.restore = async (Id, options) => {
  return models.utility.update(options, { where: { Id: Id, Deleted: 1 } });
};

