const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ip = ipAddress.replace(/[:.]/g, "");
    cb(null, `app-folders/${ip}/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

exports.upload = multer({ storage });
