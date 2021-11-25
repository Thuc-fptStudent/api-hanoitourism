'use strict';
const { Sequelize,DataTypes } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  var order_details = sequelize.define('order_details', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(4)
    },
    OrderId: {
      type: Sequelize.INTEGER(4)
    },
    ProductId: {
      type: Sequelize.INTEGER(255)
    },
    Price: {
      type: Sequelize.DECIMAL(8)
    },
    Content: {
      type: Sequelize.STRING(1024)
    },
    Quantity:{
      type: Sequelize.STRING(255)
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
    return order_details;
  }