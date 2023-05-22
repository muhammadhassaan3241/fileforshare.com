const router = require("express").Router();
const { URL } = require("../constants/all-url");
const {
  status,
  plans,
  create,
  update,
  remove,
} = require("../controllers/plan-controller");

router
  .get(URL.findPlan, status)
  .get(URL.findPlans, plans)
  .post(URL.createPlan, create)
  .post(URL.updatePlan, update)
  .get(URL.deletePlan, remove);

module.exports = router;
