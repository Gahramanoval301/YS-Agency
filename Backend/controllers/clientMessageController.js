const { ClientMessage } = require("../models");

const sendClientMessage = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, comment } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !comment) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newMessage = await ClientMessage.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      comment,
    });

    return res.status(201).json({
      message: "Message sent successfully.",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error sending client message:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getClientMessages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: messages } = await ClientMessage.findAndCountAll({
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      message: "Messages fetched successfully.",
      data: messages,
      pagination: {
        totalItems: count,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching client messages:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getClientMessages,
  sendClientMessage,
};
