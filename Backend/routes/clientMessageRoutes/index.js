const express = require("express");
const router = express.Router();
// api/message...

const {
  getClientMessages,
  sendClientMessage
} = require("../../controllers/clientMessageController");

router.get("/", getClientMessages);
router.post("/", sendClientMessage);

module.exports = router;
