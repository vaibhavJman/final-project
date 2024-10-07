const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
const userRoutes = require("./src/routes/userRoutes");

// Use Routes
app.use("/api/user/", userRoutes);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "ok",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
