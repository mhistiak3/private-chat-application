const express = require("express");
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controllers/usersController");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middleware/users/userValidators");
const avatarUpload = require("../middleware/users/avatarUpload");
const {checkLogin} = require("../middleware/auth/checkLogin");

const router = express.Router();

// Get login page
router.get("/", decorateHtmlResponse("Users"), checkLogin, getUsers);
// crate user
router.post(
  "/",
  checkLogin,
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);
router.delete("/:id",checkLogin, removeUser);
module.exports = router;
