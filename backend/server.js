// server.js



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
// const employeeRoutes = require("./src/routes/employeeRoutes");
const adminRoutes = require("./src/routes/adminRoutes");


// Use Routes
app.use("/api/user/", userRoutes);
app.use("/api/admin/", adminRoutes); // Add this line


app.get("/", (req, res) => {
  return res.status(200).json({
    message: "ok",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
