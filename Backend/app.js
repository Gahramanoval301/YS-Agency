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
    origin: ["https://ys-agency-public-website-snowy.vercel.app", "https://ys-agency-admin-panel.vercel.app/", "http://localhost:5173", "http://localhost:5174"],
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
app.use("/api/service", require("./routes/serviceRoutes/index"));
app.use("/api/project", require("./routes/projectRoutes/index"));
app.use("/api/file-upload", require("./routes/uploadRoutes/index"));
app.use("/api/contact", require("./routes/contactRoutes/index"));
app.use("/api/message", require("./routes/clientMessageRoutes/index"));
app.use("/api/studio", require("./routes/studioRoutes/index"));
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
