const models = require("../../models");
const bcrypt = require("bcryptjs");
const Paginatior = require("../commons/paginator");

//create
exports.create = async (destination) => {
  return models.destination.create(destination);
};

//get-all
exports.getAll = () => {
  return models.destination.findAndCountAll({ where: { deleted: false } });
};

//get by id
exports.getByid = (Id) => {
  return models.destination.findOne({ where: { Id: Id } });
};

//get all paging
exports.getAllPaging = (searchViewModel) => {
  limit = searchViewModel.limit;
  offset = searchViewModel.offset;
  return models.destination.findAndCountAll({
    limit: limit,
    offset: offset,
  });
};

//update
exports.update = (Id, desUpdate) => {
  return models.destination.update(desUpdate, { where: { Id: Id } });
};

//deleted
exports.delete = async (Id, options) => {
  return models.destination.update(options, { where: { Id: Id, Deleted: 0 } });
};

//restore
exports.restore = async (Id, options) => {
  return models.destination.update(options, { where: { Id: Id, Deleted: 1 } });
};

// API get detail information about products relating with categories
exports.getService = (Id) => {
  models.destination.hasMany(models.service);
  models.service.belongsTo(models.destination, { foreignKey: "DestinationId" });
  return models.destination.findOne({
     where: { Id: Id },
    include: [
      {
        model: models.service,
        attributes: [
          "Id",
          "Name",
          "ImageUrl",
          "DestinationId"
        ],
      },
    ],
  });
};

//get list products sort categories
exports.getListService = () => {
  models.destination.hasMany(models.service);
  models.service.belongsTo(models.destination, { foreignKey: "DestinationId" });
  return models.destination.findAndCountAll({
    include: [
      {
        model: models.service,
        attributes: [
          "Id",
          "Name",
          "ImageUrl",
          "DestinationId"
        ],
      },
    ],
  });
};

 //get image
 exports.getImage = () => {
  models.destination.hasMany(models.image);
  models.image.belongsTo(models.destination);
  return models.destination.findAndCountAll({
    include: [
      {
        model: models.image,
        attributes: [
          "Id",
          "Type",
          "ImageUrl",
        ],
      },
    ],
  });
}

//get image id
exports.getImageId = (Id) => {
  models.destination.hasMany(models.image);
  models.image.belongsTo(models.destination);
  return models.stores.findOne({
    where: {Id: Id},
    include: [
      {
        model: models.image,
        attributes: [
          "Id",
          "Type",
          "ImageUrl",
        ],
      },
    ],
  });
}

//get store
exports.getStore = () => {
  models.destination.hasMany(models.stores);
  models.stores.belongsTo(models.destination);
  return models.destination.findAndCountAll({
    include: [
      {
        model: models.stores,
        where:{Type:2},
        attributes: [
          "Id",
          "Name",
        ],
      },
    ],
  });
}

//get image id
exports.getStoreId = (Id) => {
  models.destination.hasMany(models.stores);
  models.stores.belongsTo(models.destination);
  return models.stores.findOne({
    where: {Id: Id},
    include: [
      {
        model: models.image,
        where:{Type:2},
        attributes: [
          "Id",
          "Name",
        ],
      },
    ],
  });
}

