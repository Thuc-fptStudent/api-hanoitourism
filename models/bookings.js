"use strict";
const { Sequelize, DataTypes } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  var bookings = sequelize.define(
    "bookings",
    {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(4),
      },
      EcommerceId: {
        type: Sequelize.INTEGER(4),
      },
      userId: {
        type: Sequelize.INTEGER(4),
      },
      StoreId: {
        type: Sequelize.INTEGER(4),
      },
      DestinationId: {
        type: Sequelize.INTEGER(4),
      },
      Formality: {
        type: Sequelize.INTEGER(2),
      },
      StartDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      EndDate: {
        type: Sequelize.DATE,
        // allowNull: false,
        // defaultValue: DataTypes.NOW
      },
      Contact: {
        type: Sequelize.STRING(1042),
      },
      Phone: {
        type: Sequelize.STRING(10),
      },
      Description: {
        type: Sequelize.STRING(1024),
      },
      Type: {
        type: Sequelize.INTEGER(2),
      },
      eventId :{
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
  return bookings;
};
