// src/routes/adminRoutes.js
const express = require("express");
const { getTable } = require("../controllers/adminController");
const { getAllEmployees, getALLscore } = require("../controllers/employeeController"); // Ensure this import is correct

const router = express.Router();

// Define routes
router.get("/table", getTable); // Route for fetching employee table
router.get("/employee", getAllEmployees);
router.get("/score", getALLscore); // Route for getting all employees

module.exports = router;
