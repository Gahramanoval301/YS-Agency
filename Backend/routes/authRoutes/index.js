const express = require("express");
const router = express.Router();
// const authenticateMiddleware = require("../../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  logout,
  refreshToken,
  checkAuth,
  confirmEmailChange,
  requestEmailChange,
  changePassword,
} = require("../../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.post("/confirm-change-email", confirmEmailChange);
router.post("/request-email-change",  requestEmailChange);
router.post("/change-password", changePassword);
router.get("/check-auth", checkAuth);

module.exports = router;
