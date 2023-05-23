const router = require("express").Router();
const { URL } = require("../constants/all-url");
const {
  getOne,
  getAll,
  create,
  update,
  remove,
} = require("../controllers/role-controller");

router
  .get(URL.findRole, getOne)
  .get(URL.findRoles, getAll)
  .post(URL.createRole, create)
  .post(URL.updateRole, update)
  .get(URL.deleteRole, remove);

module.exports = router;
