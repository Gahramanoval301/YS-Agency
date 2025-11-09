const { AdminUser } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const registerUser = async (req, res) => {
  const { userEmail, password } = req.body;

  const existingUser = await AdminUser.findOne({
    $or: [{ userEmail }],
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User name or user email already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new AdminUser({
    userEmail,
    password: hashPassword,
  });

  await newUser.save();

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
};

const loginUser = async (req, res) => {
  const { userEmail, password } = req.body;

  const checkUser = await AdminUser.findOne({
    where: { userEmail },
  });

  if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const accessToken = jwt.sign(
    {
      id: checkUser.id,
      userEmail: checkUser.userEmail,
      password: checkUser.password,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: checkUser.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  // Store refresh token in DB
  checkUser.refreshToken = refreshToken;
  console.log(refreshToken, "Refreshhh");

  await checkUser.save();

  //set httponly cookies

  console.log("hi");

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 min
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken,
      id: checkUser.id,
      userEmail: checkUser.userEmail,
      password: checkUser.password,
    },
  });
};

const requestEmailChange = async (req, res) => {
  try {
    const { userEmail, newEmail } = req.body;
    const user = await AdminUser.findOne({ where: { userEmail } });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // Generate code
    const code = crypto.randomInt(100000, 999999).toString();
    user.verificationCode = code;
    user.verificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `YS-AGENCY`,
      to: newEmail,
      subject: "Confirm your email change",
      text: `Your verification code is: ${code}`,
    });

    res.json({ success: true, message: "Verification code sent to new email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const confirmEmailChange = async (req, res) => {
  try {
    const { userEmail, newEmail, code } = req.body;
    const user = await AdminUser.findOne({ where: { userEmail } });

    if (!user || user.verificationCode !== code) {
      return res.status(400).json({ success: false, message: "Invalid code" });
    }

    if (Date.now() > new Date(user.verificationExpires).getTime()) {
      return res.status(400).json({ success: false, message: "Code expired" });
    }

    user.userEmail = newEmail;
    user.verificationCode = null;
    user.verificationExpires = null;
    await user.save();

    res.json({ success: true, message: "Email changed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { userEmail, oldPassword, newPassword } = req.body;

    // 1️⃣ Find user by email
    const user = await AdminUser.findOne({ where: { userEmail } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // 2️⃣ Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Old password is incorrect" });
    }

    // 3️⃣ Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4️⃣ Save new password
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "No refresh token" });

  // try {
  console.log("Refresh secret:", process.env.JWT_REFRESH_SECRET);

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  console.log(decoded, "decodeddd");

  const user = await AdminUser.findByPk(decoded.id);


  if (!user || user.refreshToken !== token) {
    return res
      .status(403)
      .json({ success: false, message: "Invalid refresh token" });
  }

  // new access token
  const accessToken = jwt.sign(
    { id: AdminUser.id, userEmail: AdminUser.userEmail },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "15m" }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.json({ success: true });
  // } catch (err) {
  //   return res
  //     .status(403)
  //     .json({ success: false, message: "Invalid refresh token" });
  // }
};

const checkAuth = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ authenticated: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await AdminUser.findByPk(decoded.id);
    if (!user) return res.status(401).json({ authenticated: false });

    res.json({
      authenticated: true,
      user: { id: user.id, email: user.userEmail },
    });
  } catch (err) {
    return res.status(401).json({ authenticated: false });
  }
};

const logout = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await AdminUser.findById(decoded.id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ success: true, message: "Logged out successfully" });
};
module.exports = {
  registerUser,
  loginUser,
  confirmEmailChange,
  requestEmailChange,
  changePassword,
  refreshToken,
  checkAuth,
  logout,
};
