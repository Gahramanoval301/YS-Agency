const express = require("express");
const router = express.Router();

const {
  getStudioData,
  createOrUpdateStudio,
} = require("../../controllers/studioController");

router.get("/", getStudioData);
router.post("/", createOrUpdateStudio);

module.exports = router;
