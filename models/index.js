"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    operatorsAliases: false,
    timezone: "+07:00",

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  }
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./users.js")(sequelize, Sequelize);
db.stores = require("./stores.js")(sequelize, Sequelize);
db.roles = require("./roles.js")(sequelize, Sequelize);
db.providers = require("./providers.js")(sequelize, Sequelize);
db.products = require("./products.js")(sequelize, Sequelize);
db.permissions = require("./permissions.js")(sequelize, Sequelize);
db.orders = require("./orders.js")(sequelize, Sequelize);
db.order_details = require("./orderDetails.js")(sequelize, Sequelize);
db.notifications = require("./notifications.js")(sequelize, Sequelize);
db.news = require("./news.js")(sequelize, Sequelize);
db.modules = require("./modules.js")(sequelize, Sequelize);
db.functions = require("./functions.js")(sequelize, Sequelize);
db.customers = require("./customers.js")(sequelize, Sequelize);
db.categories = require("./categories.js")(sequelize, Sequelize);
db.bookings = require("./bookings.js")(sequelize, Sequelize);
db.booking_details = require("./bookingDetails.js")(sequelize, Sequelize);
db.posts = require("./post.js")(sequelize, Sequelize);
db.ecommerces = require("./ecommerce.js")(sequelize, Sequelize);
db.team = require("./team.js")(sequelize, Sequelize);
db.news_category = require("./newsCategory")(sequelize, Sequelize);
db.brands = require("./brands")(sequelize, Sequelize);
db.productProperty = require("./productProperty")(sequelize, Sequelize);
db.productFeature = require("./productFeature")(sequelize, Sequelize);
db.destination = require("./destination")(sequelize, Sequelize);
db.service = require("./service")(sequelize, Sequelize);
db.city = require("./city")(sequelize, Sequelize);
db.district = require("./district")(sequelize, Sequelize);
db.image = require("./image")(sequelize, Sequelize);
db.address = require("./address")(sequelize, Sequelize);
db.ward = require("./ward")(sequelize, Sequelize);
db.utility = require("./utility")(sequelize, Sequelize);
db.bank = require("./bank")(sequelize, Sequelize);
db.event = require("./event")(sequelize, Sequelize);
db.assess = require("./assess")(sequelize, Sequelize);
// sequelize.sync({ alter: true });
module.exports = db;
