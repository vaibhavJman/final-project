// src/routes/adminRoutes.js
const express = require("express");
const { getTable } = require("../controllers/adminController");
const { getAllEmployees } = require("../controllers/employeeController"); // Ensure this import is correct

const router = express.Router();

// Define routes
router.get("/table", getTable); // Route for fetching employee table
router.get("/employee", getAllEmployees); // Route for getting all employees

module.exports = router;
