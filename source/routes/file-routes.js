const router = require("express").Router();
const { URL } = require("../constants/all-url");
const { uploadFiles } = require("../controllers/file-controller");
const { upload } = require("../middlewares/multer");

router.get(URL.createFile, upload.array("files", 20), uploadFiles);

module.exports = router;
