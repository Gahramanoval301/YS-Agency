// app.js
require("dotenv").config(); // ✅ Load environment variables
const express = require("express");
const cors = require("cors");
const db = require("./models"); // ✅ Import Sequelize models & connection

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // good for forms

// Routes
app.use("/api", require("./routes/test"));
app.use("/api/upload", require("./routes/upload"));

// Start server & sync database
(async () => {
  try {
    // ✅ Sync models (creates tables if they don't exist)
    await db.sequelize.sync({ force: true });

    // ✅ Ensure at least one user exists for testing
    const { User } = db;
    const count = await User.count();
    if (count === 0) {
      await User.create({ name: "Starter User", email: "starter@example.com" });
      console.log("Created starter user");
    }

    // ✅ Start server
    app.listen(PORT, () => {
      console.log(`✅ Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
})();
