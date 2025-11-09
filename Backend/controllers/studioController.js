const { Studio } = require("../models");

const getStudioData = async (req, res) => {
  try {
    const studio = await Studio.findOne();

    if (!studio) {
      return res.status(404).json({
        success: false,
        message: "Studio not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: studio,
    });
  } catch (error) {
    console.error("Error in getStudioData:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const createOrUpdateStudio = async (req, res) => {
  try {
    const { headline, content, images } = req.body;

    // ✅ Validate images format
    const normalizedImages = Array.isArray(images)
      ? images.map((img) => ({
          imgUrl: img?.imgUrl || "",
          imgFileId: img?.imgFileId || "",
        }))
      : [];

    let studio = await Studio.findOne();

    if (!studio) {
      studio = await Studio.create({
        headline,
        content,
        images: normalizedImages,
      });

      return res.status(201).json({
        success: true,
        message: "Studio created successfully",
        data: studio,
      });
    } else {
      await studio.update({
        headline,
        content,
        images: normalizedImages,
      });

      return res.status(200).json({
        success: true,
        message: "Studio updated successfully",
        data: studio,
      });
    }
  } catch (error) {
    console.error("Error in createOrUpdateStudio:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getStudioData,
  createOrUpdateStudio,
};
