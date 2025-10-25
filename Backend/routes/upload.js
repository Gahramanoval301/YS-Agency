// routes/upload.js
const express = require("express");
const multer = require("multer");
const { uploadImage } = require("../config/imagekit");
const { User } = require("../models");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), async (req, res) => {
  const { name, email } = req.body; // Multer parses text fields too
  const imageUrl = req.file ? await uploadImage(req.file) : null;

  console.log(name, email, imageUrl);

  const user = await User.create({
    name,
    email,
    imageUrl
  });

  res.status(201).json({ success: true, user });
});

module.exports = router;
