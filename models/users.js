'use strict';
const { Sequelize,DataTypes } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  var users = sequelize.define('users', {
Id: {
  allowNull: false,
  autoIncrement: true,
  primaryKey: true,
  type: Sequelize.INTEGER(4),

},
UserName: {
  type: Sequelize.STRING(255)
},
Password: {
  type: Sequelize.STRING(255)
},
FullName: {
  type: Sequelize.STRING(255)
},
Gender: {
  type: Sequelize.INTEGER(2)
},
DoB: {
  type: Sequelize.DATEONLY
},
Nation: {
  type: Sequelize.STRING(255)
},
Email: {
  type: Sequelize.STRING(255)
},
Phone: {
  type: Sequelize.STRING(10)
},
Avatar: {
  type: Sequelize.STRING(1024)
},
Type: {
  type: Sequelize.INTEGER(2)
},
StoreId: {
  type: Sequelize.INTEGER(4)
},
token: {
  type: Sequelize.STRING(255)
},
password_expires: {
  type: Sequelize.DATE,
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
  defaultValue: DataTypes.NOW,
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
return users;
}

