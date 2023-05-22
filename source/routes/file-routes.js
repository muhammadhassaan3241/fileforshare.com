const router = require("express").Router();
const { URL } = require("../constants/all-url");
const {
  uploadFiles,
  writeFile,
  readFile,
} = require("../controllers/file-controller");
const { upload } = require("../middlewares/multer-middleware");

router
  .get(URL.uploadFiles, upload.array("files", 20), uploadFiles)
  .get(URL.writeFile, writeFile)
  .get(URL.readFile, readFile);

module.exports = router;
