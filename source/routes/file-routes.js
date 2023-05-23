const router = require("express").Router();
const { URL } = require("../constants/all-url");
const {
  uploadFiles,
  writeFile,
  readFile,
  removeDataFromFile,
} = require("../controllers/file-controller");
const { upload } = require("../middlewares/multer-middleware");

router
  .post(URL.uploadFiles, upload.array("files", 20), uploadFiles)
  .post(URL.writeFile, writeFile)
  .get(URL.deleteFile, removeDataFromFile)
  .get(URL.readFile, readFile);

module.exports = router;
