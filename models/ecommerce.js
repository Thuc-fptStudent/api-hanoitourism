'use strict';

const { Sequelize, Datatypes } = require('sequelize');
module.exports = function(sequelize, DataTypes){
    var ecommerces = sequelize.define('ecommerce', {
        Id: {
            type: Sequelize.INTEGER(4),
            alowNull : false,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: Sequelize.STRING(255)
        },
        Description: {
            type: Sequelize.STRING(255)
        },
        ImageUrl: {
            type: Sequelize.STRING(1024)
        },
        Address: {
            type: Sequelize.STRING(1024)
        },
        Phone: {
            type: Sequelize.STRING(10)
        },
        Email: {
            type: Sequelize.STRING(50)
        },
        Status: {
            type: Sequelize.INTEGER(2),
            defaultValue: true
        },
        Deleted: {
            type: Sequelize.INTEGER(2),
            defaultValue : false
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
    return ecommerces;
}