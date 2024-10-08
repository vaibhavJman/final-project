// src/routes/employeeRoutes.js
const express = require("express");
const { getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee } = require("../controllers/employeeController");

const router = express.Router();

router.get("/", getEmployees); // Get all employees
router.get("/:id", getEmployeeById); // Get an employee by ID
router.post("/", createEmployee); // Create a new employee
router.put("/:id", updateEmployee); // Update an employee
router.delete("/:id", deleteEmployee); // Delete an employee

module.exports = router;
