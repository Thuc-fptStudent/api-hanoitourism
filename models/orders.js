'use strict';
const { Sequelize,DataTypes } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  var orders = sequelize.define('orders', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(4)
    },
    EcommerceId:{
      type: Sequelize.INTEGER(4),
    },
    CustomerId: {
      type: Sequelize.INTEGER(4)
    },
    StoreId: {
      type: Sequelize.INTEGER(4)
    },
    OrderDate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    Contact: {
      type: Sequelize.STRING(255)
    },
    Phone: {
      type: Sequelize.STRING(10)
    },
    Description: {
      type: Sequelize.STRING(1024)
    },
    Address: {
      type: Sequelize.STRING(1024)
    },
    Details:{
      type: Sequelize.STRING(1024)
    },
    Receiver:{
      type: Sequelize.STRING(255)
    },
    Type:{
      type : Sequelize.INTEGER(2)
    },
    Status: {
      type: Sequelize.INTEGER(2),
      defaultValue: false
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
    return orders;
  }