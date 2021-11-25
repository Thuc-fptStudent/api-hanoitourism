"use strict";
const moment = require("moment");
const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  var bank = sequelize.define(
    "bank",
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
      Address: {
        type: Sequelize.STRING(255),
      },
      OpenTime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        get()  {
            return moment(this.getDataValue('OpenTime')).format(); 
        },        
      },
      CloseTime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        get()  {
            return moment(this.getDataValue('CloseTime')).format(); 
        }, 
      },
      Phone: {
        type: Sequelize.STRING(10),
      },
      Type: {
        type: Sequelize.INTEGER(2),
      },
      DistrictId: {
        type: Sequelize.INTEGER(4),
      },
      CategoryId: {
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
  return bank;
};
