// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", require("./routes/test"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/auth", require("./routes/authRoutes/index"));
app.use("/api/about", require("./routes/aboutRoutes/index"));
app.use("/api/blog", require("./routes/blogRoutes/index"));
app.use("/api/category", require("./routes/blogRoutes/categoryRoutes"));
app.use("/api/partner", require("./routes/partnerRoutes/index"));

// Start server & sync database
(async () => {
  try {
    await db.sequelize.sync();

    const { User } = db;
    const count = await User.count();
    if (count === 0) {
      await User.create({ name: "Starter User", email: "starter@example.com" });
      console.log("Created starter user");
    }

    app.listen(PORT, () => {
      console.log(`✅ Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
})();
