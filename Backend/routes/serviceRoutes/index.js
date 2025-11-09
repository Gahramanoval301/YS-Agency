// api/service

const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
  getAllServices,
  createService,
  updateService,
  deleteService,
} = require("../../controllers/serviceController");

router.get("/", getAllServices);
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);
// router.post("/", upload.single("file"), createPartner);
// router.patch("/:id", upload.single("file"), updatePartner);

module.exports = router;
