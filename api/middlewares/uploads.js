const util                             = require("util");
const multer                           = require ('multer');
const fs                               = require("fs");
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __basedir + "\\upload\\uploads\\");
  },
  filename: function (req, files, callback) {
        callback(null,''+`${files.originalname}`)
    },
});
const upload = multer({ storage: storage }).array("ImageUrl",10);
var uploadFilesMiddleware = util.promisify(upload);
module.exports = uploadFilesMiddleware;

