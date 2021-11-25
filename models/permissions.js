'use strict';
const { Sequelize,DataTypes } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  var permissions = sequelize.define('permissions', {
    Id: {
      
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(4)
    },
    RoleId: {
      allowNull: false,
      type: Sequelize.INTEGER(4)
    },
    ModuleId: {
      allowNull: false,
      type: Sequelize.INTEGER(4)
    },
    FunctionId: {
      allowNull: false,
      type: Sequelize.INTEGER(4)
    },
    Status: {
      type: Sequelize.INTEGER(2)
    },
    Deleted: {
      type: Sequelize.INTEGER(2),
       

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
    return permissions;
  }