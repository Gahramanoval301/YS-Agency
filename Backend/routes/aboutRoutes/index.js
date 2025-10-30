const express = require("express");
const router = express.Router();
const {
  getAboutContent,
  sendAboutContent,
  updateAboutContent
} = require("../../controllers/aboutController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/get", getAboutContent);
router.post("/send-data", upload.single("file"), sendAboutContent);
router.patch("/update-data", upload.single("file"), updateAboutContent);

module.exports = router;
