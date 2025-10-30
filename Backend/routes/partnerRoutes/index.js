// api/partner

const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
  getAllPartners,
  createPartner,
  updatePartner,
  deletePartner,
} = require("../../controllers/partnerController");

router.get("/", getAllPartners);
router.post("/", upload.single("file"), createPartner);
router.patch("/:id", upload.single("file"), updatePartner);
router.delete("/:id", deletePartner);

module.exports = router;
