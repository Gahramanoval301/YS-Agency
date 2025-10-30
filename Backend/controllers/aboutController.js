const { uploadImage } = require("../config/imagekit");
const { About } = require("../models");

const getAboutContent = async (req, res) => {
  try {
    const about = await About.findOne();

    // if (!about) return res.status(404).json({ message: "Data not found" });

    res.status(200).json({
      success: true,
      message: "Data is found!",
      data: about,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const sendAboutContent = async (req, res) => {
  try {
    const statistics = req.body.statistics
      ? JSON.parse(req.body.statistics)
      : undefined;
    const texts = req.body.texts ? JSON.parse(req.body.texts) : undefined;

    let about = await About.findOne();

    let uploadedImage;
    if (req.file) {
      uploadedImage = await uploadImage(req.file);

      // Optionally delete old image using about.imageUrlFileId
      if (about && about.imageUrlFileId) {
        try {
          await imagekit.deleteFile(about.imageUrlFileId);
        } catch (err) {
          console.error("Failed to delete old image:", err);
        }
      }
    }

    console.log(uploadImage);
    if (about) {
      if (uploadedImage) {
        about.imageUrl = uploadedImage.url;
        about.imageUrlFileId = uploadedImage.fileId;
      }
      about.statistics = statistics ?? about.statistics;
      about.texts = texts ?? about.texts;

      await about.save();
    } else {
      about = await About.create({
        imageUrl: uploadedImage?.url ?? null,
        imageUrlFileId: uploadedImage?.fileId ?? null,
        statistics,
        texts,
      });
    }

    res
      .status(200)
      .json({ message: "About content saved successfully", about });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateAboutContent = async (req, res) => {
  try {
    console.log("boooooooooooooooo");

    // Parse JSON fields sent as text
    const statistics = req.body.statistics
      ? JSON.parse(req.body.statistics)
      : undefined;
    const texts = req.body.texts ? JSON.parse(req.body.texts) : undefined;

    // Find the existing About record
    let about = await About.findOne();

    let uploadedImage;
    if (req.file) {
      uploadedImage = await uploadImage(req.file);

      // Delete old image if it exists
      if (about && about.imageUrlFileId) {
        try {
          await imagekit.deleteFile(about.imageUrlFileId);
        } catch (err) {
          console.error("Failed to delete old image:", err);
        }
      }
    }

    if (about) {
      // Update only the fields that are provided
      if (uploadedImage) {
        about.imageUrl = uploadedImage.url;
        about.imageUrlFileId = uploadedImage.fileId;
      }
      if (statistics !== undefined) about.statistics = statistics;
      if (texts !== undefined) about.texts = texts;

      await about.save();
    } else {
      // Create a new record if none exists
      about = await About.create({
        imageUrl: uploadedImage?.url ?? null,
        imageUrlFileId: uploadedImage?.fileId ?? null,
        statistics,
        texts,
      });
    }

    res
      .status(200)
      .json({ message: "About content updated successfully", about });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAboutContent, sendAboutContent, updateAboutContent };
