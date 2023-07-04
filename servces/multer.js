const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    console.log(req.body)
    cb(null, Date.now() + "-" + req.body.name.replaceAll(" ", "-")+`.png`);
  },
});
module.exports = {
  multer,
  storage,
};
