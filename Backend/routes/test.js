const express = require("express");
// const multer = require("multer");
const router = express.Router();
const multer = require("multer");
const controller = require("../controllers/testController");
const { uploadImage } = require("../config/imagekit");
const { User } = require("../models");
const upload = multer({ storage: multer.memoryStorage() });

// Initialize multer (use memory storage so file is in req.file.buffer)
// const upload = multer({ storage: multer.memoryStorage() });

// Routes
router.get("/ping", controller.ping);
router.get("/users", controller.listUsers);
router.post("/users/add", upload.single("file"), controller.createUser);
// ✅ Add multer middleware ONLY for this route
// router.post("/users/add", controller.createUser);

module.exports = router;
