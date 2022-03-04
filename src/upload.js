const multer = require("multer");
const path = require("path");
/*
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};*/



module.exports = {
    upload
}