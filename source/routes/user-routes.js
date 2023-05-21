const router = require("express").Router();
const { URL } = require("../constants/all-url");
const {
  login,
  signUp,
  forgotPassword,
  resetPassword,
} = require("../controllers/user-controller");

router
  .post(URL.login, login)
  .post(URL.signUp, signUp)
  .post(URL.forgotPassword, forgotPassword)
  .post(URL.resetPassword, resetPassword);

module.exports = router;
