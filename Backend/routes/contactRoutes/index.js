const express = require("express");
const router = express.Router();
// api/contact...

const {
  getContact,
  updateContact,
  sendContact,
} = require("../../controllers/contactController");

router.get("/", getContact);
router.put("/", updateContact);
router.post("/", sendContact);

module.exports = router;
