// controllers/testController.js
const { uploadImage } = require("../config/imagekit");
const { User } = require("../models");
// const { User } = db;

exports.ping = (req, res) => {
  res.json({ message: "pong" });
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
exports.createUser = async (req, res) => {
  const { name, email } = req.body; // Multer parses text fields too
  const imageUrl = req.file ? await uploadImage(req.file) : null;

  console.log(name, email, imageUrl);

  const user = await User.create({
    name,
    email,
    imageUrl,
  });

  res.status(201).json({ success: true, user });
};
