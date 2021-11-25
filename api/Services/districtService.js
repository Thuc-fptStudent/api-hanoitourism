const models = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const messageConstants = require("../constant/messageConstants");
const Paginatior = require("../commons/paginator");

//Create
exports.create = async (district) => {
  return models.district.create(district);
};

// Find All
exports.get = () => {
  return models.district.findAndCountAll();
};

// Find All Paging
exports.getallpaging = (searchViewModel) => {
  limit = searchViewModel.limit;
  offset = searchViewModel.offset;
  return models.district.findAndCountAll({
    limit: limit,
    offset: offset,
  });
};

// Get all news by district
exports.getListNews = () => {
  models.district.hasMany(models.news);
  models.news.belongsTo(models.district);
  return models.district.findAndCountAll({
    include: [
      {
        model: models.news,
        attributes: [
          "Id",
          "Name",
          "Description",
          "Content",
          "ImageUrl",
          "DistrictId",
        ],
      },
    ],
  });
};
//get news id
exports.getNews = (Id) => {
  models.district.hasMany(models.news);
  models.news.belongsTo(models.district);
  return models.district.findOne({
    where: { Id: Id },
    include: [
      {
        model: models.news,
        attributes: [
          "Id",
          "Name",
          "Description",
          "Content",
          "ImageUrl",
          "DistrictId",
        ],
      },
    ],
  });
};

// FindById
exports.getbyID = async (Id) => {
  return models.district.findOne({ where: { Id: Id } });
};

// Update
exports.update = async (Id, options) => {
  return models.district.update(options, { where: { Id: Id } });
};

//  Deleted fake
exports.delete = async (Id, options) => {
  return models.district.update(options, { where: { Id: Id, Deleted: 0 } });
};

// Restore
exports.restore = async (Id, options) => {
  return models.district.update(options, { where: { Id: Id, Deleted: 1 } });
};

//get ward by district
exports.getListWard = () => {
  models.district.hasMany(models.ward);
  models.ward.belongsTo(models.district);
  return models.district.findAll({
    include: [
      {
        model: models.ward,
        attributes: ["Id", "Name", "DistrictId"],
      },
    ],
  });
};

//get ward by district id
exports.getWard = (Id) => {
  models.district.hasMany(models.ward);
  models.ward.belongsTo(models.district);
  return models.district.findAll({
    where: { Id: Id },
    include: [
      {
        model: models.ward,
        attributes: ["Id", "Name", "DistrictId"],
      },
    ],
  });
};

//get hospital by district
exports.getListHospital = () => {
  models.district.hasMany(models.utility);
  models.utility.belongsTo(models.district);
  return models.district.findAll({
    attributes: ["Id", "Name", "CityId"],
    include: [
      {
        model: models.utility,
        where: { Type: 1 },
        attributes: [
          "Id",
          "Name",
          "Address",
          "OpenTime",
          "CloseTime",
          "Phone",
          "Type",
          "DistrictId",
        ],
      },
    ],
  });
};

//get hospital by ward id
exports.getHospital = (Id) => {
  models.district.hasMany(models.utility);
  models.utility.belongsTo(models.district);
  return models.district.findAll({
    attributes: ["Id", "Name", "CityId"],
    where: { Id: Id },
    include: [
      {
        model: models.utility,
        where: { Type: 1 },
        attributes: [
          "Id",
          "Name",
          "Address",
          "OpenTime",
          "CloseTime",
          "Phone",
          "Type",
          "DistrictId",
        ],
      },
    ],
  });
};

//get pharmacy by district
exports.getListPharmacy = () => {
  models.district.hasMany(models.utility);
  models.utility.belongsTo(models.district);
  return models.district.findAll({
    attributes: ["Id", "Name", "CityId"],
    include: [
      {
        model: models.utility,
        where: { Type: 2 },
        attributes: [
          "Id",
          "Name",
          "Address",
          "OpenTime",
          "CloseTime",
          "Phone",
          "Type",
          "DistrictId",
        ],
      },
    ],
  });
};

//get hospital by ward id
exports.getPharmacy = (Id) => {
  models.district.hasMany(models.utility);
  models.utility.belongsTo(models.district);
  return models.district.findAll({
    attributes: ["Id", "Name", "CityId"],
    where: { Id: Id },
    include: [
      {
        model: models.utility,
        where: { Type: 2 },
        attributes: [
          "Id",
          "Name",
          "Address",
          "OpenTime",
          "CloseTime",
          "Phone",
          "Type",
          "DistrictId",
        ],
      },
    ],
  });
};

//get bank by district
exports.getListBank = () => {
  models.district.hasMany(models.categories);
  models.categories.belongsTo(models.district);
  models.categories.hasMany(models.bank);
  models.bank.belongsTo(models.categories);
  return models.district.findAll({
    attributes: ["Id", "Name", "CityId"],
    include: [
      {
        model: models.categories,
        where: { ParentId: 23 },
        attributes: ["Id", "Name", "DistrictId"],
        include: [
          {
            model: models.bank,
            where: { Type: 1 },
            attributes: [
              "Id",
              "Name",
              "Address",
              "OpenTime",
              "CloseTime",
              "Phone",
              "Type",
              "CategoryId",
            ],
          },
        ],
      },
    ],
  });
};

//get bank by district id
exports.getBank = (Id) => {
  models.district.hasMany(models.categories);
  models.categories.belongsTo(models.district);
  models.categories.hasMany(models.bank);
  models.bank.belongsTo(models.categories);
  return models.district.findAll({
    attributes: ["Id", "Name", "CityId"],
    where: { Id: Id },
    include: [
      {
        model: models.categories,
        where: { ParentId: 23 },
        attributes: ["Id", "Name", "DistrictId"],
        include: [
          {
            model: models.bank,
            where: { Type: 1 },
            attributes: [
              "Id",
              "Name",
              "Address",
              "OpenTime",
              "CloseTime",
              "Phone",
              "Type",
              "CategoryId",
            ],
          },
        ],
      },
    ],
  });
};

//get ATM by district
exports.getListATM = () => {
  models.district.hasMany(models.bank);
  models.bank.belongsTo(models.district);
  return models.district.findAll({
    attributes: ["Id", "Name", "CityId"],
    include: [
      {
        model: models.bank,
        where: { Type: 2 },
        attributes: [
          "Id",
          "Name",
          "Address",
          "OpenTime",
          "CloseTime",
          "Phone",
          "Type",
          "DistrictId",
        ],
      },
    ],
  });
};

//get ATM by district id
exports.getATM = (Id) => {
  models.district.hasMany(models.bank);
  models.bank.belongsTo(models.district);
  return models.district.findAll({
    attributes: ["Id", "Name", "CityId"],
    where: { Id: Id },
    include: [
      {
        model: models.bank,
        where: { Type: 2 },
        attributes: [
          "Id",
          "Name",
          "Address",
          "OpenTime",
          "CloseTime",
          "Phone",
          "Type",
          "DistrictId",
        ],
      },
    ],
  });
};

//get embassy by district
exports.getListEmbassy = () => {
  models.district.hasMany(models.categories);
  models.categories.belongsTo(models.district);
  models.categories.hasMany(models.utility);
  models.utility.belongsTo(models.categories);
  models.utility.hasMany(models.image);
  models.image.belongsTo(models.utility);
  return models.district.findAll({
    attributes: ["Id", "Name", "CityId"],
    include: [
      {
        model: models.categories,
        where: { ParentId: 33 },
        attributes: ["Id", "Name", "DistrictId"],
        include: [
          {
            model: models.utility,
            where: { Type: 3 },
            attributes: [
              "Id",
              "Name",
              "Address",
              "OpenTime",
              "CloseTime",
              "Phone",
              "Email",
              "Type",
              "CategoryId",
            ],
            include: [
              {
                model: models.image,
                where: { Type: 2 },
                attributes: ["Id", "Type", "ImageUrl", "utilityId"],
              },
            ],
          },
        ],
      },
    ],
  });
};

//get embassy by district id
exports.getEmbassy = (Id) => {
  models.district.hasMany(models.categories);
  models.categories.belongsTo(models.district);
  models.categories.hasMany(models.utility);
  models.utility.belongsTo(models.categories);
  models.utility.hasMany(models.image);
  models.image.belongsTo(models.utility);
  return models.district.findOne({
    where: { Id: Id },
    attributes: ["Id", "Name", "CityId"],
    include: [
      {
        model: models.categories,
        where: { ParentId: 33 },
        attributes: ["Id", "Name", "DistrictId"],
        include: [
          {
            model: models.utility,
            where: { Type: 3 },
            attributes: [
              "Id",
              "Name",
              "Address",
              "OpenTime",
              "CloseTime",
              "Phone",
              "Email",
              "Type",
              "CategoryId",
            ],
            include: [
              {
                model: models.image,
                where: { Type: 2 },
                attributes: ["Id", "Type", "ImageUrl", "utilityId"],
              },
            ],
          },
        ],
      },
    ],
  });
};


//get agencies by district
exports.getListAgencies = () => {
  models.district.hasMany(models.utility);
  models.utility.belongsTo(models.district);
  return models.district.findAll({
    attributes: ["Id", "Name", "CityId"],
    include: [
      {
        model: models.utility,
        where: { Type: 5 },
        attributes: [
          "Id",
          "Name",
          "Address",
          "OpenTime",
          "CloseTime",
          "Phone",
          "Type",
          "DistrictId",
        ],
      },
    ],
  });
};

//get agencies by district id
exports.getAgencies = (Id) => {
  models.district.hasMany(models.utility);
  models.utility.belongsTo(models.district);
  return models.district.findAll({
    attributes: ["Id", "Name", "CityId"],
    where: { Id: Id },
    include: [
      {
        model: models.utility,
        where: { Type: 5 },
        attributes: [
          "Id",
          "Name",
          "Address",
          "OpenTime",
          "CloseTime",
          "Phone",
          "Type",
          "DistrictId",
        ],
      },
    ],
  });
};