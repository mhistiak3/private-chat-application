const express = require("express");
const { getInbox } = require("../controllers/inboxController");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");

const router = express.Router();

// Get login page
router.get("/", decorateHtmlResponse("Inbox"),getInbox);

module.exports = router;
