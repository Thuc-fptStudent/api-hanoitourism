"use strict";
const { Sequelize, DataTypes } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  var stores = sequelize.define(
    "stores",
    {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(4),
      },
      Name: {
        type: Sequelize.STRING(255),
      },
      EcommerceId: {
        type: Sequelize.INTEGER(4),
      },
      Description: {
        type: Sequelize.STRING(255),
      },
      Content: {
        type: Sequelize.STRING(1024),
      },
      Email: {
        type: Sequelize.STRING(255),
      },
      Phone: {
        type: Sequelize.STRING(10),
      },
      GMap: {
        type: Sequelize.STRING(1024),
      },
      Facebook: {
        type: Sequelize.STRING(255),
      },
      Shopee: {
        type: Sequelize.STRING(255),
      },
      Address: {
        type: Sequelize.STRING(255),
      },
      Youtube: {
        type: Sequelize.STRING(255),
      },
      ProductId: {
        type: Sequelize.INTEGER(4),
      },
      ImageUrl: {
        type: Sequelize.STRING(255),
      },
      CategoryId: {
        type: Sequelize.INTEGER(4),
      },
      Type:{
        type: Sequelize.INTEGER(2)
      },
      destinationId:{
        type: Sequelize.INTEGER(4)
      },
      userId:{
        type : Sequelize.INTEGER(4)
      },
      Status: {
        type: Sequelize.INTEGER(2),
        defaultValue: true,
      },
      Deleted: {
        type: Sequelize.INTEGER(2),
        defaultValue: false,
      },
      CreatedDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      CreatedBy: {
        type: Sequelize.STRING(255),
      },
      UpdatedDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      UpdatedBy: {
        type: Sequelize.STRING(255),
      },
    },
    {
      timestamps: false,
    }
  );
  return stores;
};
