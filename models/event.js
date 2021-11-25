"use strict";
const { Sequelize, DataTypes } = require("sequelize");
const moment = require("moment");
module.exports = function (sequelize, DataTypes) {
  var event = sequelize.define(
    "event",
    {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(4),
      },
      Name:{
          type: Sequelize.STRING(255)
      },
      EcommerceId: {
        type: Sequelize.INTEGER(4),
      },
      CustomerId: {
        type: Sequelize.INTEGER(4),
      },
      Cost: {
        type: Sequelize.DECIMAL(8),
      },
      StartTime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        get() {
          return moment(this.getDataValue("StartTime")).format();
        },
      },
      EndTime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        get() {
          return moment(this.getDataValue("EndTime")).format();
        },
      },
      Description: {
        type: Sequelize.STRING(1024),
      },
      Address:{
          type: Sequelize.STRING(255)
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
  return event;
};
