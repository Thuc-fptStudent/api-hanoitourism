const models = require("../../models");
const messageConstants = require("../constant/messageConstants");

//create
exports.create = async (event) => {
  return models.event.create(event);
};

//find all
exports.getAll = () => {
  return models.event.findAndCountAll({ where: { deleted: false } });
};

//find all paging
exports.getallpaging = (searchViewModel) => {
  limit = searchViewModel.limit;
  offset = searchViewModel.offset;
  return models.event.findAndCountAll({
    limit: limit,
    offset: offset,
    where: { deleted: false },
  });
};

//Findbyid
exports.getById = async (Id) => {
  return models.event.findOne({ where: { Id: Id } });
};

//update
exports.update = async (Id, eventUpdate) => {
  return models.event.update(eventUpdate, { where: { Id: Id } });
};

//soft delete
exports.delete = (Id, options) => {
  return models.event.update(options, { where: { Id: Id, Deleted: 0 } });
};

//restore
exports.restore = async (Id, options) => {
  return models.event.update(options, { where: { Id: Id, Deleted: 1 } });
};

//list image by event
exports.getListImage = () => {
  models.event.hasMany(models.image);
  models.image.belongsTo(models.event);
  return models.event.findAll({
    attributes: ["Id", "Name", "Cost","Address" ,"StartTime", "EndTime", "Description"],
    include: [
      {
        model: models.image,
        where: { Type: 3 },
        attributes: ["Id", "Type", "ImageUrl", "eventId"],
      },
    ],
  });
};

//list image by event id
exports.getImage = (Id) => {
  models.event.hasMany(models.image);
  models.image.belongsTo(models.event);
  return models.event.findAll({
    where: { Id: Id },
    attributes: ["Id", "Name", "Cost", "Address","StartTime", "EndTime", "Description"],
    include: [
      {
        model: models.image,
        where: { Type: 3 },
        attributes: ["Id", "Type", "ImageUrl", "eventId"],
      },
    ],
  });
};
