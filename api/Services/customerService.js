const models = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const messageConstants = require("../constant/messageConstants");
const Paginator = require("../commons/paginator");

//  Sign-in/Create
exports.register = async (customer) => {
  const userName = await models.customers.findOne({
    where: { UserName: customer.UserName },
  });
  if (!userName) {
    const email = await models.customers.findOne({
      where: { Email: customer.Email },
    });
    if (!email) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(customer.Password, salt);
      customer.Password = hashPassword;
      return models.customers.create(customer);
    } else {
      return Promise.resolve({
        message: messageConstants.CUSTOMER_MAIL_EXIST,
      });
    }
  } else {
    return Promise.resolve({
      message: messageConstants.CUSTOMER_EXIST_NAME,
    });
  }
};

// Login
exports.login = (account) => {
  return models.customers
    .findOne({ where: { UserName: account.UserName } },
      {
        attributes: [
          "Id",
          "UserName",
          "FullName",
          "Email",
          "Phone",
          "Avatar",
          "Status",
          "Deleted",
        ],
      })
    .then(async (customer) => {
      if (customer) {
        const isMatch = await bcrypt.compare(
          account.Password,
          customer.Password
        );
        if (isMatch) {
          const payload = {
            UserName: customer.UserName,
            // Password: customer.Password,
            FullName: customer.FullName,
          };
          const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "7h" }
          );
          const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
          );
          return { accessToken, refreshToken };
        } else {
          return Promise.resolve({
            status: 404,
            message: messageConstants.CUSTOMER_PASS_INVALID,
          });
        }
      } else {
        return Promise.resolve({
          status: 404,
          message: messageConstants.CUSTOMER_NAME_NOT_EXIST,
        });
      }
    });
};

// Find All
exports.get = function () {
  return models.customers.findAndCountAll();
};

// Find All By Paging
exports.getallpaging = function (searchViewModel) {
  limit = searchViewModel.limit;
  offset = searchViewModel.offset;
  return models.customers.findAndCountAll({
    limit: limit,
    offset: offset,
  });
};

// FindById
exports.getbyID = async (Id) => {
  return models.customers.findOne({ where: { Id: Id } });
};

// Update
exports.update = async (Id, options) => {
  const id = await models.customers.findOne({ where: { Id: Id } });
  if (!id) {
    return Promise.resolve({
      message: messageConstants.CUSTOMER_ID_NOT_FOUND,
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(options.Password, salt);
    options.Password = hashPassword;
    return models.customers.update(options, { where: { Id: Id } });
  }
};

//  Delete
exports.destroy = async (Id) => {
  const id = await models.customers.findOne({ where: { Id: Id } });
  if (!id) {
    return Promise.resolve({
      message: messageConstants.CUSTOMER_ID_NOT_FOUND,
    });
  } else {
    return models.customers.destroy({ where: { Id: Id } });
  }
};

//  Deleted fake
exports.delete = async (Id, options) => {
  const id = await models.customers.findOne({ where: { Id: Id } });
  if (!id) {
    return Promise.resolve({
      message: messageConstants.CUSTOMER_ID_NOT_FOUND,
    });
  } else {
    return models.customers.update(options, { where: { Id: Id, Deleted: 0 } });
  }
};

// Restore
exports.restore = async (Id, options) => {
  const id = await models.customers.findOne({ where: { Id: Id } });
  if (!id) {
    return Promise.resolve({
      message: messageConstants.CUSTOMER_ID_NOT_FOUND,
    });
  } else {
    const deleted = await models.customers.findOne({ where: { Deleted: 1 } });
    if (!deleted) {
      return Promise.resolve({
        message: messageConstants.CUSTOMER_NOT_AVAILABLE,
      });
    } else {
      return models.customers.update(options, {
        where: { Id: Id, Deleted: 1 },
      });
    }
  }
};

//get list address sort user
exports.getListAddress = () => {
  models.customers.hasMany(models.address);
  models.address.belongsTo(models.customers, { foreignKey: "CustomerId" });
  return models.users.findAndCountAll({
    include: [
      {
        model: models.address,
        attributes: [
          "Name",
          "CustomerId",
          "Phone",
          "City",
          "District",
          "Ward",
          "Street",
          "Unit",
          "AddressCategory",
          "DefaultAddress",
        ],
      },
    ],
  });
};

//get list address sort user by id
exports.getAddress = (Id) => {
  models.customers.hasMany(models.address);
  models.address.belongsTo(models.customers, { foreignKey: "CustomerId" });
  return models.users.findOne({
    where: { Id: Id },
    include: [
      {
        model: models.address,
        attributes: [
          "Name",
          "CustomerId",
          "Phone",
          "City",
          "District",
          "Ward",
          "Street",
          "Unit",
          "AddressCategory",
          "DefaultAddress",
        ],
      },
    ],
  });
};
