const express = require("express");
const { getLogin, login, logout } = require("../controllers/loginController");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");
const {
  loginValidator,
  loginValidatorHandler,
} = require("../middleware/auth/loginValidator");
const {
  checkLogin,
  redirectLoggedIn,
} = require("../middleware/auth/checkLogin");

const router = express.Router();
const page_title = "Login";
// Get login page
router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);

// login user
router.post(
  "/",
  decorateHtmlResponse(page_title),
  loginValidator,
  loginValidatorHandler,
  login
);

// logout user
router.delete("/", checkLogin, logout);

module.exports = router;
