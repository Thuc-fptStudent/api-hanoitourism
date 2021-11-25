const {oneOf,check} = require('express-validator');


// Users
let validateRegisterUser = () => {
  return [ 
    check('UserName', 'UserName does not Empty').not().isEmpty(),
    check('UserName', 'UserName more than 8 degits').escape().trim().isLength({ min: 8 }),
    check('Email', 'Email does not Empty').not().isEmpty(),
    check('Email', ' Email should be form of Email').escape().trim().isEmail(),
    check('Password', 'Password more than 8 degits').notEmpty().trim().isLength({ min:8 }),
    check('Password', 'Password should have number and words').isAlphanumeric(),

  ]; 
}

let validateCheckLogin=()=>{
  return[
    oneOf([
      [
      check('UserName').exists(),
      check('UserName', 'Invalid does not Empty').not().isEmpty(),
      check('UserName', 'UserName more than 8 degits').escape().trim().isLength({ min: 8 }),
      check('Password').exists(),
      check('Password', 'Password more than 8 degits').trim().isLength({ min: 8}),
      check('Password', 'Password should have number and words').isAlphanumeric(),
    ],
      check('access_token').exists()
    ]),
];
}

// Roles

let validateCreateRoles = () => {
    return [ 
        check('Name', 'Name does not Empty').not().isEmpty(),
        check('Name', 'Name more than 2 degits').escape().trim().isLength({ min: 2 }),
    ]; 
}

// Provider

let validateCreateProviders = () => {
    return [ 
        check('Name', 'Name does not Empty').not().isEmpty(),
        check('Name', 'Name more than 2 degits').escape().trim().isLength({ min: 2 }),
    ]; 
}

// Product

// let validateCreateProduct = () => {
//     return [ 
//         check('Name', 'Name does not Empty').not().isEmpty(),
//         check('Name', 'Name more than 2 degits').escape().trim().isLength({ min: 2 }),
//         check('Description', 'Description does not Empty').not().isEmpty(),
//         check('Content', 'Content does not Empty').not().isEmpty(),
//         check('ParentId', 'ParentId does not Empty').not().isEmpty(),
//         check('ImageUrl', 'ImageUrl does not Empty').not().isEmpty(),
//     ]; 
// }

// Permission

let validatePermission = () => {
    return [ 
        check('RoleId', 'RoleId does not Empty').not().isEmpty(),
        check('ModuleId', 'ModuleId does not Empty').not().isEmpty(),
        check('FunctionId','FunctionId does not Empty').not().isEmpty(),
        check('RoleId', 'RoleId should be a number').isNumeric(),
        check('ModuleId', 'ModuleId should be a number').isNumeric(),
        check('FunctionId','FunctionId should be a number').isNumeric()
    ]; 
}

// Order

let validateOrder = () => {
    return [ 
        check('CustomerId', 'CustomerId does not Empty').not().isEmpty(),
        check('StoreId', 'StoreId does not Empty').not().isEmpty(),
        check('Contact','Contact does not Empty').not().isEmpty(),
        check('Phone','Phone does not Empty').not().isEmpty(),
        check('Address','Address does not Empty').not().isEmpty(),
    ]; 
}

// OrderDetail

let validateOrderDetail = () => {
    return [ 
        check('OrderId', 'OrderId does not Empty').not().isEmpty(),
        check('OrderId', 'OrderId is a number').isNumeric(),
        check('ProductId','ProductId does not Empty').not().isEmpty(),
        check('ProductId', 'ProductId is a number').isNumeric(),
        check('Price','Price does not Empty').not().isEmpty(),
        check('Price', 'Price is a number').isNumeric(),
        check('Content','Content is not Empty').not().isEmpty(),
    ]; 
}

// Notification

let validateNoticfication = () => {
    return [ 
        check('StoreId', 'StoreId does not Empty').not().isEmpty(),
        check('StoreId', 'StoreId is a number').isNumeric(),
        check('Name','Name does not Empty').not().isEmpty(),
        check('Content','Content does not Empty').not().isEmpty(),
    ]; 
}
// News

// let validateNews = () => {
//     return [ 
//         check('Description', 'Description does not Empty').not().isEmpty(),
//         check('ImageUrl', 'ImageUrl does not Empty').not().isEmpty(),
//         check('Name','Name does not Empty').not().isEmpty(),
//         check('Content','Content does not Empty').not().isEmpty(),
//     ]; 
// }

// Customer

let validateRegisterCustomer = () => {
    return [ 
        check('UserName', 'UserName does not Empty').not().isEmpty(),
        check('UserName', 'UserName more than 6 degits').escape().trim().isLength({ min: 6 }),
        check('Email', 'Invalid does not Empty').not().isEmpty(),
        check('Email', 'Invalid Email').escape().trim().isEmail(),
        check('Password', 'Password more than 8 degits').notEmpty().trim().isLength({ min:8 }),
        check('Password', 'Password should have number and words').isAlphanumeric(),
        
    ]; 
}



// categories
// let validateCreateCategories = () => {
//     return [ 
//         check('Name', 'Name does not Empty').not().isEmpty(),
//         check('Name', 'Name more than 6 degits').escape().trim().isLength({ min: 6 }),
//     ]; 
// }

// Modules

let validateModules = () => {
    return [ 
        check('Name', 'Name does not Empty').not().isEmpty(),
        check('Name', 'Name more than 6 degits').escape().trim().isLength({ min: 6 }),
        check('Url', 'Url does not Empty').not().isEmpty(),
        check('Description', 'Description does not Empty').not().isEmpty(),
        check('ParentId', 'ParentId does not Empty').not().isEmpty(),
        check('Icon', 'Icon does not Empty').not().isEmpty(),
    ]; 
}

// Functions

let validateFunctions = () => {
    return [ 
        check('Name', 'Name does not Empty').not().isEmpty(),
        check('Name', 'Name more than 6 degits').escape().trim().isLength({ min: 6 }),
        check('Description', 'Description does not Empty').not().isEmpty(),
        check('ParentId', 'ParentId does not Empty').not().isEmpty(),
        check('Icon', 'Icon does not Empty').not().isEmpty(),
    ]; 
}

// Booking

// let validateBookings = () => {
//     return [ 
//         check('CustomerId', 'CustomerId does not Empty').not().isEmpty(),
//         check('CustomerId', 'CustomerId is a number').isNumeric(),
//         // check('StoreId', 'StoreId does not Empty').not().isEmpty(),
//         // check('StoreId', 'StoreId is a number').isNumeric(),
//         check('Description', 'Description does not Empty').not().isEmpty(),
//         check('Contact', 'Contact does not Empty').not().isEmpty(),
//         check('Phone', 'Phone does not Empty').not().isEmpty(),
//         check('Phone', 'Phone include 10 numbers').escape().trim().isLength({ isLength: 10 }),
//     ]; 
// }

// Booking-details

let validateBookingDetails = () => {
    return [ 
        check('BookingId', 'BookingId does not Empty').not().isEmpty(),
        check('BookingId', 'BookingId is a number').isNumeric(),
        check('ProductId', 'ProductId does not Empty').not().isEmpty(),
        check('ProductId', 'ProductId is a number').isNumeric(),
        check('Description', 'Description does not Empty').not().isEmpty(),
        check('Price', 'Price does not Empty').not().isEmpty(),
        check('Price', 'Price is a number').isNumeric(),
    ]; 
}

//Ecommerce
// let validateEcommerce = () => {
//     return [
//         check('Name', 'Name does not Empty').not().isEmpty(),
//         check('Email', 'Invalid does not Empty').not().isEmpty(),
//         check('Email', 'Email format is wrong').escape().trim().isEmail(),
//         check('Phone','Phone does not Empty').not().isEmpty(),
//         check('Address','Address does not Empty').not().isEmpty(),
//     ];
// }

//Team
let validateTeam = () => {
    return [
        check('Name', 'Name does not Empty').not().isEmpty(),
        check('Email', 'Invalid does not Empty').not().isEmpty(),
        check('Email', 'Email format is wrong').escape().trim().isEmail(),
        check('Phone','Phone does not Empty').not().isEmpty(),
        check('Owner', 'Owner does not Empty').not().isEmpty(),
    ];
}

//news_category
let validateNewsCate = () => {
    return [
        check('Name', 'Name does not Empty').not().isEmpty(),
        check('Description', 'Description does not Empty').not().isEmpty(),
    ];
}

//product_property
let validateProductProPerty = () =>{
    return [
        check('Name','Name does not Empty').not().isEmpty(),
        check('Description','Name does not Empty').not().isEmpty(),

    ];
}

//product_feature
let validateProductFeature = () =>{
    return [
        check('Name','Name does not Empty').not().isEmpty()
    ];
}

//brand
// let validateBrand = () =>{
//     return [
//         check('Name','Name does not Empty').not().isEmpty()
//     ];
// }

let validate = {
    validateRegisterCustomer: validateRegisterCustomer,
    validateCheckLogin: validateCheckLogin,
    // validateCreateCategories: validateCreateCategories,
    validateRegisterUser: validateRegisterUser,
    validateCheckLogin: validateCheckLogin,
    // validateNews: validateNews,
    validateNoticfication: validateNoticfication,
    validateOrderDetail: validateOrderDetail,
    validateOrder: validateOrder,
    validatePermission: validatePermission,
    validateCreateProviders: validateCreateProviders,
    // validateCreateProduct: validateCreateProduct,
    validateCreateRoles: validateCreateRoles,
    validateModules : validateModules ,
    validateFunctions: validateFunctions,
    // validateBookings: validateBookings,
    validateBookingDetails: validateBookingDetails,
    // validateEcommerce : validateEcommerce,
    validateTeam : validateTeam,
    validateNewsCate: validateNewsCate,
    validateProductProPerty: validateProductProPerty, 
    // validateBrand: validateBrand,
    validateProductFeature: validateProductFeature
};

module.exports = {validate};