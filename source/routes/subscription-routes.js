const router = require("express").Router();
const { URL } = require("../constants/all-url");
const {
  status,
  create,
  update,
  remove,
} = require("../controllers/subscription-controller");

router
  .get(URL.findSubscription, status)
  .post(URL.createSubscription, create)
  .post(URL.updateSubscription, update)
  .get(URL.deleteSubscription, remove);

module.exports = router;
