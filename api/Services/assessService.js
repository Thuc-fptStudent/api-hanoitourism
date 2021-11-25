const models = require("../../models");


// Create
exports.create = async (assess) => {
  return models.assess.create(assess);
};

// Find All
exports.getAll = () => {
  return models.assess.findAndCountAll();
};
//create-url
exports.createUrl = async(file) => {
  var url = "/upload/uploads/"+file.filename;
  return url
}

// Find All By Paging
exports.getallpaging = (searchViewModel) => {
  limit = searchViewModel.limit;
  offset = searchViewModel.offset;
  return models.assess.findAndCountAll({
    limit: limit,
    offset: offset,
  });
};



// FindById
exports.getbyID = async (Id) => {
  return models.assess.findOne({ where: { Id: Id } });
};

// Update
exports.update = async (Id, assessUpdate) => {
  return models.assess.update(assessUpdate, { where: { Id: Id } });
};


//  Deleted fake
exports.delete = async (Id, options) => {
  return models.assess.update(options, { where: { Id: Id, Deleted: 0 } });
};

// Restore
exports.restore = async (Id, options) => {
  return models.assess.update(options, { where: { Id: Id, Deleted: 1 } });
};
