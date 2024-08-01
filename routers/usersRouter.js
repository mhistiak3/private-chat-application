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

const router = express.Router();

// Get login page
router.get("/", decorateHtmlResponse("Users"), getUsers);
// crate user
router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);
router.delete("/:id", removeUser);
module.exports = router;
