"use strict";
const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  var destination = sequelize.define(
    "destination",
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
      ImageUrl: {
        type: Sequelize.STRING(1042),
      },
      DistrictId: {
        type: Sequelize.INTEGER(4),
      },
      DestinationId: {
        type: Sequelize.INTEGER(4),
      },
      Content: {
        type: Sequelize.STRING(1042),
      },
      Location: {
        type: Sequelize.STRING(255),
      },
      Description: {
        type: Sequelize.STRING(255),
      },
      Price: {
        type: Sequelize.DECIMAL(8),
      },
      StoreId: {
        type: Sequelize.INTEGER(4),
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
  return destination;
};
