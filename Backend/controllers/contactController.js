
const { Contact } = require("../models");

const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();

    if (!contact) {
      return res.status(404).json({
        message: "Contact information not found. Please create it first.",
      });
    }

    return res.status(200).json({
      message: "Contact information fetched successfully.",
      contact,
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const sendContact = async (req, res) => {
  try {
    const existingContact = await Contact.findOne();
    if (existingContact) {
      return res.status(400).json({
        message: "Contact information already exists. Please update instead.",
      });
    }

    const { headline, subHeadline, cardsData, socialMedias } = req.body;

    const newContact = await Contact.create({
      headline,
      subHeadline,
      cardsData,
      socialMedias,
    });

    return res.status(201).json({
      message: "Contact information created successfully.",
      contact: newContact,
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    if (!contact) {
      return res
        .status(404)
        .json({ message: "Contact not found. Please create it first." });
    }

    const { headline, subHeadline, cardsData, socialMedias } = req.body;

    if (headline !== undefined) contact.headline = headline;
    if (subHeadline !== undefined) contact.subHeadline = subHeadline;
    if (cardsData !== undefined) contact.cardsData = cardsData;
    if (socialMedias !== undefined) contact.socialMedias = socialMedias;

    await contact.save();

    return res.status(200).json({
      message: "Contact information updated successfully.",
      contact,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getContact,
  updateContact,
  sendContact,
};
