const express = require("express");
const { getInbox } = require("../controllers/inboxController");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");
const {checkLogin} = require("../middleware/auth/checkLogin");

const router = express.Router();

// Get login page
router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

module.exports = router;
