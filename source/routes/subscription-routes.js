const router = require("express").Router();
const { URL } = require("../constants/all-url");
const {
  getOne,
  getAll,
  create,
  update,
  remove,
} = require("../controllers/subscription-controller");

router
  .get(URL.findSubscription, getOne)
  .get(URL.findSubscriptions, getAll)
  .post(URL.createSubscription, create)
  .post(URL.updateSubscription, update)
  .get(URL.deleteSubscription, remove);

module.exports = router;
