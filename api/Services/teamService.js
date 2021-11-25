const models = require("../../models");
const bcrypt = require('bcryptjs');
const messageConstants = require('../constant/messageConstants');
const Paginatior = require('../commons/paginator');
const { Op } = require('sequelize');
const { Sequelize } = require('../../models');

//create
exports.create = async(team) => {
    return models.team.create(team);
};

//find all
exports.get = () => {
    return models.team.findAndCountAll({where: {deleted: false}});
};

//get all paging
exports.getallpaging = (searchViewModel) => {
    limit = searchViewModel.limit;
    offset = searchViewModel.offset;
    return models.team.findAndCountAll({
        limit: limit,
        offset: offset,
        where: {deleted: false}
    });
};


//findbyid
exports.getById = async (Id) => {
    return models.team.findOne({where: {Id: Id}});
};

//UPDATE
exports.update = async (Id, teamUpdate) => {
    return models.team.update(teamUpdate, {where: {Id: Id}});
};

//delete
exports.destroy = async (Id) => {
    return models.team.destroy({where: {Id: Id}})
};

//soft delete
exports.delete = (Id, options) => {
    return models.team.update(options, { where: {Id: Id, Deleted: 0} });
};

//restore
exports.restore = async (Id, options) => {
    return models.team.update(options, {where: {Id: Id, Deleted: 1}});
};