"use strict";
const { Sequelize, DataTypes } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  var city = sequelize.define(
    "city",
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
  return city;
};
