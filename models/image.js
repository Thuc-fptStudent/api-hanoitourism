"use strict";
const { Sequelize, DataTypes } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  var image = sequelize.define(
    "image",
    {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(4),
      },
      Type: {
        type: Sequelize.INTEGER(2),
      },
      ImageUrl: {
        type: Sequelize.STRING(255),
      },
      storeId: {
        type: Sequelize.INTEGER(2),
      },
      destinationId: {
        type: Sequelize.INTEGER(4),
      },
      utilityId:{
        type: Sequelize.INTEGER(4)
      },
      eventId:{
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
  return image;
};
