'use strict';
const { Sequelize,DataTypes } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  var booking_details = sequelize.define('booking_details', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(4)
    },
    BookingId: {
      type: Sequelize.INTEGER(4)
    },
    ProductId: {
      type: Sequelize.INTEGER(4)
    },
    Price: {
      type: Sequelize.DECIMAL(8)
    },
    Description: {
      type: Sequelize.STRING(1024)
    },
    Status: {
      type: Sequelize.INTEGER(2)
    },
    Deleted: {
      type: Sequelize.INTEGER(2)
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
    return booking_details;
  }