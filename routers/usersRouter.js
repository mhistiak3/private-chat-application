const express = require("express");
const { getUsers } = require("../controllers/usersController");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");

const router = express.Router();

// Get login page
router.get("/", decorateHtmlResponse("Users"), getUsers);

module.exports = router;
