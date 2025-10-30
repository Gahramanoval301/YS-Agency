const { uploadImage } = require("../config/imagekit");
const imagekit = require("../config/imagekit"); // ensure imagekit.deleteFile works
const { Partner } = require("../models");

const getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({
      success: true,
      message: "Partners fetched successfully",
      data: partners,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createPartner = async (req, res) => {
  try {
    let uploadedImage;

    if (req.file) {
      uploadedImage = await uploadImage(req.file);
    }

    const newPartner = await Partner.create({
      imgUrl: uploadedImage?.url ?? null,
      imgUrlFileId: uploadedImage?.fileId ?? null,
      //   note: req.body.note || null,
    });

    res.status(201).json({
      success: true,
      message: "Partner created successfully",
      data: newPartner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updatePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const partner = await Partner.findByPk(id);

    if (!partner) return res.status(404).json({ message: "Partner not found" });

    let uploadedImage;
    if (req.file) {
      uploadedImage = await uploadImage(req.file);

      // Delete old image
      if (partner.imgUrlFileId) {
        try {
          await imagekit.deleteFile(partner.imgUrlFileId);
        } catch (err) {
          console.error("Failed to delete old image:", err);
        }
      }

      partner.imgUrl = uploadedImage.url;
      partner.imgUrlFileId = uploadedImage.fileId;
    }

    partner.note = req.body.note ?? partner.note;
    await partner.save();

    res.status(200).json({
      success: true,
      message: "Partner updated successfully",
      data: partner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete a partner
const deletePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const partner = await Partner.findByPk(id);

    if (!partner) return res.status(404).json({ message: "Partner not found" });

    if (partner.imgUrlFileId) {
      try {
        await imagekit.deleteFile(partner.imgUrlFileId);
      } catch (err) {
        console.error("Failed to delete image:", err);
      }
    }

    await partner.destroy();
    res.status(200).json({
      success: true,
      message: "Partner deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllPartners,
  createPartner,
  updatePartner,
  deletePartner,
};
