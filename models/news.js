'use strict';
const { Sequelize,DataTypes } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  var news = sequelize.define('news', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(4)
    },
    EcommerceId:{
      type: Sequelize.INTEGER(4),
    },
    DistrictId:{
      type: Sequelize.INTEGER(4),
    },
    Name: {
      type: Sequelize.STRING(255)
    },
    Description: {
      type: Sequelize.STRING(1042)
    },
    Content: {
      type: Sequelize.STRING(1024)
    },
    ImageUrl: {
      type: Sequelize.STRING(1025)
    },
    Role:{
      type: Sequelize.INTEGER(2)
    },
    Status: {
      type: Sequelize.INTEGER(2)
    },
    Deleted: {
      type: Sequelize.INTEGER(2)
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
    return news;
  }