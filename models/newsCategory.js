'use strict';

const { Sequelize, Datatypes } = require('sequelize');
module.exports = function(sequelize, DataTypes){
    var news_category = sequelize.define('news_category', {
        Id: {
            type: Sequelize.INTEGER(4),
            alowNull : false,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: Sequelize.STRING(255)
        },
        EcommerceId:{
            type: Sequelize.INTEGER(4),
          },
        Description: {
            type: Sequelize.STRING(255)
        },
        ImageUrl: {
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
            alowNull: false,
            defaultValue: DataTypes.NOW
        },
        CreatedBy: {
            type: Sequelize.STRING(255)
        },
        UpdatedDate: {
            type: Sequelize.DATE,
            alowNull: false,
            defaultValue: DataTypes.NOW
        },
        UpdatedBy: {
            type: Sequelize.STRING(255)
        }
    },
    {
        timestamps: false
    });
    return news_category;
}