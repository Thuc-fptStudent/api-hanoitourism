"use strict";
const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  var address = sequelize.define(
    "address",
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
      userId: {
        type: Sequelize.INTEGER(4),
      },
      Phone: {
        type: Sequelize.STRING(10),
      },
      City: {
        type: Sequelize.INTEGER(4),
      },
      District: {
        type: Sequelize.INTEGER(2),
      },
      Ward: {
        type: Sequelize.INTEGER(2),
      },
      Street: {
        type: Sequelize.STRING(255),
      },
      Unit: {
        type: Sequelize.STRING(255),
      },
      AddressCategory: {
        type: Sequelize.INTEGER(2),
        defaultValue: false,
      },
      DefaultAddress: {
        type: Sequelize.INTEGER(2),
        defaultValue: false,
      },
      CustomerId: {
        type: Sequelize.INTEGER(4),
      },
      CityName: {
        type: Sequelize.STRING(255),
      },
      DistrictName: {
        type: Sequelize.STRING(255),
      },
      WardName: {
        type: Sequelize.STRING(255),
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
  return address;
};
