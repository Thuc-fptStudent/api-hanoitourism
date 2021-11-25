const models = require("../../models");
const bcrypt = require("bcryptjs");
const messageConstants = require("../constant/messageConstants");
const Paginatior = require("../commons/paginator");
const { Op } = require("sequelize");
const { Sequelize } = require("../../models");

//create
exports.create = async (newsCate) => {
    return models.news_category.create(newsCate);
};

//findall
exports.get = () => {
    return models.news_category.findAndCountAll({where: {deleted: false}});
};

//get all paging
exports.getallpaging = (searchViewModel) => {
    limit = searchViewModel.limit;
    offset = searchViewModel.offset;
    return models.news_category.findAndCountAll({
        limit: limit,
        offset: offset,
        where: {Deleted: false}
    });
};

//findbyid
exports.getById = async (Id) => {
  return models.news_category.findOne({where: {Id: Id}});
};

//update
exports.update = async (Id, newsCateUpdate) => {
    return models.news_category.update(newsCateUpdate, {where: {Id: Id}});
};

//delete
exports.destroy = async (Id) => {
    const newsCate = await models.news_category.findOne({where: {Id: Id}});

};

//soft delete
exports.delete = (Id, options) => {
    return models.news_category.update(options, { where: { Id: Id, Deleted: 0 } });
};

//restore
exports.restore = (Id, options) => {
    return models.news_category.update(options, { where: { Id: Id, Deleted: 1 } });
};
