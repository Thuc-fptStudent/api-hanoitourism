"use strict";
const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  var district = sequelize.define(
    "district",
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
      CityId:{
          type: Sequelize.INTEGER(4)
      },
      DestinationId:{
        type: Sequelize.INTEGER(4)
      },
      CategoryId:{
        type: Sequelize.INTEGER(4)
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
        type: Sequelize.DATEONLY,
      },
      CreatedBy: {
        type: Sequelize.STRING(255),
      },
      UpdatedDate: {
        type: Sequelize.DATEONLY,
      },
      UpdatedBy: {
        type: Sequelize.STRING(255),
      },
    },
    {
      timestamps: false,
    }
  );
  return district;
};
