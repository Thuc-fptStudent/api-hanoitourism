'use strict';
const { Sequelize,DataTypes } = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  var categories = sequelize.define('categories', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(4)
    },
    Name: {
      type: Sequelize.STRING(255)
    },
    EcommerceId:{
      type: Sequelize.INTEGER(4),
    },
    Description: {
      type: Sequelize.STRING(255)
    },
    Content: {
      type: Sequelize.STRING(1024)
    },
    ParentId: {
      type: Sequelize.INTEGER(4)
    },
    ImageUrl: {
      type: Sequelize.STRING(1024)
    },
    DistrictId:{
      type: Sequelize.INTEGER(4)
    },
    StoreId:{
      type: Sequelize.INTEGER(4)
    },
    Status: {
      type: Sequelize.INTEGER(2),
      defaultValue: true
    },
    Deleted: {
      type: Sequelize.INTEGER(2),
      defaultValue: false
    },
    CreatedDate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    CreatedBy: {
      type: Sequelize.STRING(255)
    },
    UpdatedDate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    UpdatedBy: {
      type: Sequelize.STRING(255)
    },
    },
    {
       timestamps: false
    });
    return categories;
  }