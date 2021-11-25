const models = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const messageConstants = require("../constant/messageConstants");
// const Paginator = require('../commons/Paginators');
const Paginator = require("../commons/paginator");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql::memory");
const Op = models.Sequelize.Op;

/**
 * Returns a list of vehicleMake
 * @param   {SearchViewModel}   searchViewModel - The model search to find
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */

exports.get = function () {
  return models.users.findAndCountAll({ where: { Deleted: 0 } });
};

// Get all paging information about users

exports.getallpaging = function (searchViewModel) {
  limit = searchViewModel.limit;
  offset = searchViewModel.offset;
  var filters = {};
  filters.$and = [
    {
      Deleted: 0,
    },
  ];

  // var searchModel = searchViewModel.condition;
  // var sortColumn = searchViewModel.sortColumn;

  //  if ( searchModel != null) {
  //   if(searchModel.UserName)
  //   filters.$and.push( { UserName: { $like: '%' + searchModel.UserName + '%'}
  //     }
  //   )
  // }
  // let orderby = 'Id ASC';
  // if (sortColumn && sortColumn.columnName != null) {
  //     if (sortColumn.columnName && sortColumn.isAsc) {
  //         orderby = sortColumn.columnName + ' ASC';
  //     } else {
  //         orderby = sortColumn.columnName + ' DESC';
  //     }
  // }
  return models.users.findAndCountAll({
    where: { Deleted: 0 },
    //  where: filters,
    //  order: orderby,
    limit: limit,
    offset: offset,
  });
};

// Check
exports.check = async (account) => {
  const user = await models.users.findOne({
    where: { Deleted: 0, UserName: account.UserName },
  });
  const customer = await models.customers.findOne({
    where: { Deleted: 0, UserName: account.UserName },
  });
  return Promise.resolve({
    user: user,
    customer: customer,
  });
};
//  Login
exports.login1 = (account) => {
  return models.users
    .findOne(
      { where: { Deleted: 0, UserName: account.UserName } },
      {
        attributes: [
          "Id",
          "UserName",
          "FullName",
          "Gender",
          "DoB",
          "Nation",
          "Email",
          "Phone",
          "Avatar",
          "Type",
          "StoreId",
          "Status",
          "Deleted",
        ],
      }
    )
    .then(async (user) => {
      if (user) {
        if (user.Deleted == 0) {
          const isMatch = await bcrypt.compare(account.Password, user.Password);
          if (isMatch) {
            const payload = {
              UserName: user.UserName,
              FullName: user.FullName,
              Nation: user.Nation,
              Gender: user.Gender,
            };
            const accessToken = jwt.sign(
              payload,
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "10d" }
            );
            const refreshToken = jwt.sign(
              payload,
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: "7d" }
            );
            return { accessToken, refreshToken, user };
          } else {
            return Promise.resolve({
              status: 404,
              message: messageConstants.USER_PASS_INVALID,
            });
          }
        } else {
          return Promise.resolve({
            status: 404,
            message: messageConstants.USER_NOT_AVAILABLE,
          });
        }
      } else {
        return Promise.resolve({
          status: 404,
          message: messageConstants.USER_USERNAME_NOT_EXIST,
        });
      }
    });
};
//  Login
exports.login2 = (account) => {
  return models.customers
    .findOne(
      { where: { Deleted: 0, UserName: account.UserName } },
      {
        attributes: [
          "Id",
          "UserName",
          "FullName",
          "Gender",
          "DoB",
          "Nation",
          "Email",
          "Phone",
          "Avatar",
          "Type",
          "StoreId",
          "Status",
          "Deleted",
        ],
      }
    )
    .then(async (customer) => {
      if (customer) {
        if (user.Deleted == 0) {
          const isMatch = await bcrypt.compare(
            account.Password,
            customer.Password
          );
          if (isMatch) {
            const payload = {
              UserName: customer.UserName,
              Password: customer.Password,
            };
            const accessToken = jwt.sign(
              payload,
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "10m" }
            );
            const refreshToken = jwt.sign(
              payload,
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: "7d" }
            );
            return { accessToken, refreshToken, customer };
          } else {
            return Promise.resolve({
              status: 404,
              message: messageConstants.CUSTOMER_PASS_INVALID,
            });
          }
        } else {
          return Promise.resolve({
            status: 404,
            message: messageConstants.CUSTOMER_NOT_AVAILABLE,
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
// //  Sign-in/Create
exports.register1 = async (user) => {
  const email = await models.users.findOne({
    where: { Deleted: 0, Email: user.Email },
  });
  if (!email) {
    const userName = await models.users.findOne({
      where: { Deleted: 0, UserName: user.UserName },
    });
    if (!userName) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(user.Password, salt);
      user.Password = hashPassword;
      return models.users.create(user);
    } else {
      return Promise.resolve({
        message: messageConstants.USER_EXIST_NAME,
      });
    }
  } else {
    return Promise.resolve({
      message: messageConstants.USER_MAIL_EXIST,
    });
  }
};

exports.register2 = async (customer) => {
  const userName = await models.customers.findOne({
    where: { Deleted: 0, UserName: customer.UserName },
  });
  if (!userName) {
    const email = await models.customers.findOne({
      where: { Deleted: 0, Email: customer.Email },
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
// Find User with Roles
exports.getRoles = () => {
  const UserRole = sequelize.define("UserRole", {
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: models.users,
        key: "Type",
      },
    },
    RoleId: {
      type: DataTypes.INTEGER,
      references: {
        model: models.roles,
        key: "id",
      },
    },
  });
  models.users.belongsTo(models.roles, {
    through: UserRole,
    foreignKey: "Type",
  });
  models.roles.belongsTo(models.users, { through: UserRole, foreignKey: "id" });
  return models.users.findAndCountAll({
    where: { Deleted: 0 },
    attributes: ["UserName", "Password", "Email", "Phone", "Avatar", "Type"],
    include: [
      {
        model: models.roles,
        attributes: ["Name", "Description"],
      },
    ],
  });
};
// // Get user have stores
// exports.getStores = function () {
//   const UserStore = sequelize.define("UserStore", {
//     UserId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: models.users,
//         key: "StoreId",
//       },
//     },
//     StoreId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: models.stores,
//         key: "id",
//       },
//     },
//   });
//   models.users.belongsTo(models.stores, {
//     through: UserStore,
//     foreignKey: "StoreId",
//   });
//   models.stores.belongsTo(models.users, {
//     through: UserStore,
//     foreignKey: "id",
//   });
//   return models.users.findAndCountAll({
//     where: { Deleted: 0 },
//     attributes: ["UserName", "Password", "Email", "Phone", "Avatar", "StoreId"],
//     include: [
//       {
//         model: models.stores,
//         attributes: [
//           "Name",
//           "Description",
//           "Content",
//           "Phone",
//           "GMap",
//           "Facebook",
//           "Shopee",
//           "Youtube",
//         ],
//       },
//     ],
//   });
// };

// Find by Id
exports.getbyID = async (Id) => {
  return models.users.findOne({ where: { Id: Id } });
};

// Update
exports.update = async (Id, userUpdate) => {
  const id = await models.users.findOne({ where: { Id: Id } });
  if (!id) {
    return Promise.resolve({
      message: messageConstants.USER_ID_NOT_FOUND,
    });
  } else {
    const Deleted = await models.users.findOne({ where: { Deleted: 1 } });
    if (Deleted) {
      return Promise.resolve({
        message: messageConstants.USER_NOT_AVAILABLE,
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(userUpdate.Password, salt);
      userUpdate.Password = hashPassword;
      return models.users.update(userUpdate, { where: { Id: Id } });
    }
  }
};

//  Deleted fake
exports.delete = async (Id, options) => {
  const id = await models.users.findOne({ where: { Id: Id } });
  if (id) {
    const Deleted = await models.users.findOne({ where: { Deleted: 1 } });
    if (Deleted === null) {
      return models.users.update(options, { where: { Id: Id, Deleted: 0 } });
    } else {
      return Promise.resolve({
        message: messageConstants.USER_NOT_AVAILABLE,
      });
    }
  } else {
    return Promise.resolve({
      message: messageConstants.USER_ID_NOT_FOUND,
    });
  }
};
// Restore
exports.restore = async (Id, options) => {
  const id = await models.users.findOne({ where: { Id: Id } });
  if (!id) {
    return Promise.resolve({
      message: messageConstants.USER_ID_NOT_FOUND,
    });
  } else {
    const Deleted = await models.users.findOne({ where: { Deleted: 1 } });
    if (!Deleted) {
      return Promise.resolve({
        message: messageConstants.USER_NOT_AVAILABLE,
      });
    } else {
      return models.users.update(options, { where: { Id: Id, Deleted: 1 } });
    }
  }
};

//  Delete
exports.destroy = async (Id) => {
  const id = await models.users.findOne({ where: { Id: Id } });
  if (!id) {
    return Promise.resolve({
      message: messageConstants.USER_ID_NOT_FOUND,
    });
  } else {
    return models.users.destroy({ where: { Id: Id } });
  }
};

// Reset password
exports.resetPassword = async (account) => {
  const user = await models.users.findOne({
    where: { Deleted: 0, UserName: account.user_name },
  });
  if (user) {
    const isMatch = await bcrypt.compare(account.Password, user.Password);
    if (isMatch) {
      const isMatch2 = await bcrypt.compare(
        account.new_password,
        user.Password
      );
      if (!isMatch2) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(account.new_password, salt);
        account.new_password = hashPassword;
        const options = { Password: account.new_password, UpdatedDate: Date() };
        return models.users.update(options, { where: { Id: user.id } });
      } else {
        return Promise.resolve({
          message: messageConstants.USER_PASS_EXIST,
        });
      }
    } else {
      return Promise.resolve({
        message: messageConstants.USER_PASS_INVALID,
      });
    }
  } else {
    return Promise.resolve({
      message: messageConstants.USER_USERNAME_NOT_EXIST,
    });
  }
};
// Forget-Password
exports.forgetPassword = async (account) => {
  const user = await models.users.findOne({
    where: {
      token: account.token,
      password_expires: {
        $gt: Date.now(),
      },
    },
  });
  if (user) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(account.password, salt);
    account.password = hashPassword;
    const options = { password: account.password, update_date: Date() };
    return models.users.update(options, { where: { id: user.id } });
  } else {
    return Promise.resolve({
      message: messageConstants.USER_USERNAME_NOT_EXIST,
    });
  }
};

//get list address sort user
exports.getListAddress = () => {
  models.users.hasMany(models.address);
  models.address.belongsTo(models.users, { foreignKey: "userId" });
  return models.users.findAndCountAll({
    include: [
      {
        model: models.address,
        attributes: [
          "Name",
          "userId",
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
  models.users.hasMany(models.address);
  models.address.belongsTo(models.users, { foreignKey: "userId" });
  return models.users.findOne({
    where:{ Id: Id },
    include: [
      {
        model: models.address,
        attributes: [
          "Name",
          "userId",
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
//API get detail information about bookings relating with customer
exports.getBookings = (Id) => {
  models.users.hasMany(models.bookings);
  models.bookings.belongsTo(models.users, { foreignKey: "userId" });
  return models.users.findOne({
     where: { Id: Id },
    include: [
      {
        model: models.bookings,
        attributes: [
          "Id",
          "EcommerceId",
          "userId",
          "StartDate",
          "Phone",
          "Contact",
          "Description"
        ],
      },
    ],
  });
};

//get list products sort categories
exports.getListBookings = () => {
  models.users.hasMany(models.bookings);
  models.bookings.belongsTo(models.users, { foreignKey: "userId" });
  return models.users.findAndCountAll({
    include: [
      {
        model: models.bookings,
        attributes: [
          "Id",
          "EcommerceId",
          "userId",
          "StartDate",
          "Phone",
          "Contact",
          "Description"
        ],
      },
    ],
  });
};


//API get store by user id
exports.getStore = (Id) => {
  models.users.hasMany(models.stores);
  models.stores.belongsTo(models.users, { foreignKey: "userId" });
  return models.users.findOne({
     where: { Id: Id },
    include: [
      {
        model: models.stores,
        where:{Type:2},
        attributes: [
          "Id",
          "Name",
          "userId",
          "Description",
          "Email",
          "Phone"
        ],
      },
    ],
  });
};

//get get store by user
exports.getListStore = () => {
  models.users.hasMany(models.stores);
  models.stores.belongsTo(models.users, { foreignKey: "userId" });
  return models.users.findAndCountAll({
    include: [
      {
        model: models.stores,
        where:{Type:2},
        attributes: [
          "Id",
          "Name",
          "userId",
          "Description",
          "Email",
          "Phone"
        ],
      },
    ],
  });
};
