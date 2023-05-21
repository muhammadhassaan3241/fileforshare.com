const router = require("express").Router();
const { URL } = require("../constants/all-url");
const { createFolder, deleteFolder } = require("../controllers/app-controller");

router.get(URL.app.home, createFolder).get(URL.deleteFolder, deleteFolder);

module.exports = router;
