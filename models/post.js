'use strict';
const { Sequelize,DataTypes } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  var posts = sequelize.define('posts', {
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
return posts;
}

