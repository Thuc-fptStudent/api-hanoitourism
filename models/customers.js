'use strict';
const { Sequelize,DataTypes } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  var customers = sequelize.define('customers', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(4)
    },
    EcommerceId:{
      type: Sequelize.INTEGER(4),
    },
    UserName: {
      type: Sequelize.STRING(255)
    },
    Password: {
      type: Sequelize.STRING(255)
    },
    FullName: {
      type: Sequelize.STRING(255)
    },
    Email: {
      type: Sequelize.STRING(1024)
    },
    Avatar: {
      type: Sequelize.STRING(1024)
    },
    Type:{
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
      type: Sequelize.STRING(225)
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
    return customers;
  }