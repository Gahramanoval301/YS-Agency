// src/routes/uploadRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadImage, deleteImage } = require("../../config/imagekit"); // your ImageKit helper

const upload = multer({ storage: multer.memoryStorage() });

// -------------------
// Upload a new file
// -------------------
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const uploaded = await uploadImage(req.file); // returns { url, fileId }
    res.status(201).json(uploaded);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

// -------------------
// Delete a file by fileId
// -------------------
router.delete("/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;
    if (!fileId) return res.status(400).json({ message: "fileId is required" });

    await deleteImage(fileId); // helper function to delete in ImageKit
    res.json({ message: "File deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

// -------------------
// Update a file by fileId
// (delete old and upload new)
// -------------------
router.put("/:fileId", upload.single("file"), async (req, res) => {
  try {
    const { fileId } = req.params;
    if (!fileId) return res.status(400).json({ message: "fileId is required" });
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Delete old file
    await deleteImage(fileId);

    // Upload new file
    const uploaded = await uploadImage(req.file);
    res.json({
      message: "File updated successfully",
      newFile: uploaded,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

// -------------------
// Get file info
// -------------------
router.get("/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;
    if (!fileId) return res.status(400).json({ message: "fileId is required" });

    // ImageKit does not provide a direct "get" by fileId in SDK, but you can return URL if stored in DB
    // For now, return fileId as placeholder
    res.json({ fileId, message: "Use your DB to store URL & retrieve info" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Get file failed", error: err.message });
  }
});

module.exports = router;
