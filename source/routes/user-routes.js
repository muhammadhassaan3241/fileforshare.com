const router = require("express").Router();
const { URL } = require("../constants/all-url");
const {
  getOne,
  getAll,
  create,
  update,
  remove,
} = require("../controllers/user-controller");

router
  .get(URL.findUser, getOne)
  .get(URL.findUsers, getAll)
  .post(URL.createUser, create)
  .post(URL.updateUser, update)
  .get(URL.deleteUser, remove);

module.exports = router;
