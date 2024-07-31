const express = require("express");
const { getLogin } = require("../controllers/loginController");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");

const router = express.Router();

// Get login page
router.get("/", decorateHtmlResponse("Login"), getLogin);

module.exports = router;
