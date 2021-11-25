const models = require("../../models");
const bcrypt = require("bcryptjs");
const messageConstants = require("../constant/messageConstants");
const Paginatior = require("../commons/paginator");

// Create
exports.create = async (city) => {
  return models.city.create(city);
};

// Find All
exports.get = () => {
  return models.city.findAndCountAll();
};

// Find All By Paging
exports.getallpaging = (searchViewModel) => {
  limit = searchViewModel.limit;
  offset = searchViewModel.offset;
  return models.city.findAndCountAll({
    limit: limit,
    offset: offset,
  });
};

// Find combine
exports.getListcombine = () => {
  models.city.hasMany(models.district);
  models.district.belongsTo(models.city);
  models.district.hasMany(models.news);
  models.news.belongsTo(models.district, { foreignKey: "NewsId" });
  models.district.hasMany(models.destination);
  models.destination.belongsTo(models.district, {
    foreignKey: "DestinationId",
  });
  models.destination.hasMany(models.image);
  models.image.belongsTo(models.destination);
  return models.city.findAll({
    include: [
      {
        model: models.district,
        attributes: ["Id", "Name"],
        include: [
          {
            model: models.news,
            attributes: [
              "Id",
              "Name",
              "Description",
              "Content",
              "ImageUrl",
              "Role",
            ],
          },
          {
            model: models.destination,
            attributes: [
              "Id",
              "Name",
              "ImageUrl",
              "Content",
              "Location",
              "Description",
              "Price",
            ],
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
          },
        ],
      },
    ],
  });
};
//find combine id
exports.getcombine = (Id) => {
  models.city.hasMany(models.district);
  models.district.belongsTo(models.city);
  models.district.hasMany(models.news);
  models.news.belongsTo(models.district, { foreignKey: "NewsId" });
  models.district.hasMany(models.destination);
  models.destination.belongsTo(models.district, {
    foreignKey: "DestinationId",
  });
  models.destination.hasMany(models.image);
  models.image.belongsTo(models.destination);
  return models.city.findOne({
    where: { Id: Id },
    include: [
      {
        model: models.district,
        attributes: ["Id", "Name"],
        include: [
          {
            model: models.news,
            attributes: [
              "Id",
              "Name",
              "ImageUrl",
              "Description",
              "Content",
              "Role",
            ],
          },
          {
            model: models.destination,
            attributes: [
              "Id",
              "Name",
              "ImageUrl",
              "Content",
              "Location",
              "Description",
              "Price",
            ],
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
          },
        ],
      },
    ],
  });
};

// FindById
exports.getbyID = async (Id) => {
  return models.city.findOne({ where: { Id: Id } });
};

// Update
exports.update = async (Id, cityUpdate) => {
  return models.city.update(cityUpdate, { where: { Id: Id } });
};


//  Deleted fake
exports.delete = async (Id, options) => {
  return models.city.update(options, { where: { Id: Id, Deleted: 0 } });
};

// Restore
exports.restore = async (Id, options) => {
  return models.city.update(options, { where: { Id: Id, Deleted: 1 } });
};

// Find combine
exports.getListFood = () => {
  models.city.hasMany(models.district);
  models.district.belongsTo(models.city);
  models.district.hasMany(models.categories);
  models.categories.belongsTo(models.district);
  models.categories.hasMany(models.stores);
  models.stores.belongsTo(models.categories);
  return models.city.findAll({
    include: [
      {
        model: models.district,
        attributes: ["Id", "Name"],
        include: [
          {
            model: models.categories,
            where: { ParentId: 3 },
            attributes: [
              "Id",
              "Name",
              "Description",
              "Content",
              "ImageUrl",
              "ParentId",
            ],
            include: [
              {
                model: models.stores,
                attributes: [
                  "Id",
                  "Name",
                  "Description",
                  "ImageUrl",
                  "CategoryId",
                ],
              },
            ],
          },
        ],
      },
    ],
  });
};
//get food by id
exports.getFood = (Id) => {
  models.city.hasMany(models.district);
  models.district.belongsTo(models.city);
  models.district.hasMany(models.categories);
  models.categories.belongsTo(models.district, { foreignKey: "CategoryId" });
  models.categories.hasMany(models.stores);
  models.stores.belongsTo(models.categories, { foreignKey: "StoreId" });
  return models.city.findAll({
    where: { Id: Id },
    include: [
      {
        model: models.district,
        attributes: ["Id", "Name"],
        include: [
          {
            model: models.categories,
            where: { ParentId: 3 },
            attributes: [
              "Id",
              "Name",
              "Description",
              "Content",
              "ImageUrl",
              "ParentId",
            ],
            include: [
              {
                model: models.stores,
                attributes: [
                  "Id",
                  "Name",
                  "Description",
                  "ImageUrl",
                  "CategoryId",
                ],
              },
            ],
          },
        ],
      },
    ],
  });
};

//get district
exports.getListDistrict = () => {
  models.city.hasMany(models.district);
  models.district.belongsTo(models.city);
  return models.city.findAll({
    include: [
      {
        model: models.district,
        attributes: ["Id", "Name", "CityId"]
      },
    ],
  });
};

//get district by id
exports.getDistrict = (Id) => {
  models.city.hasMany(models.district);
  models.district.belongsTo(models.city);
  return models.city.findAll({
    where: { Id: Id },
    include: [
      {
        model: models.district,
        attributes: ["Id", "Name", "CityId"],
      },
    ],
  });
};