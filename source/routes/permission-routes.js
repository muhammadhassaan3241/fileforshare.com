const router = require("express").Router();
const { URL } = require("../constants/all-url");
const {
  getOne,
  getAll,
  create,
  update,
  remove,
} = require("../controllers/permission-controller");

router
  .get(URL.findPermission, getOne)
  .get(URL.findPermissions, getAll)
  .post(URL.createPermission, create)
  .post(URL.updatePermission, update)
  .get(URL.deletePermission, remove);

module.exports = router;
