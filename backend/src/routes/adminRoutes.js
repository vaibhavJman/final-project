// src/routes/adminRoutes.js
const express = require("express");
const { getTable } = require("../controllers/adminController");
const { getGenderCount, getEmployeeCount, getAdminCount, getTrainerCount, getTrainingCount, getAllTrainers} = require("../controllers/employeeController"); // Ensure this import is correct

const router = express.Router();

// Define routes
router.get("/table", getTable); // Route for fetching employee table
// router.get("/employee", getAllEmployees);
router.get("/gendercount",getGenderCount);
router.get("/employeecount",getEmployeeCount)
router.get("/adminCount",getAdminCount)
router.get("/trainerCount",getTrainerCount)
router.get("/trainingCount",getTrainingCount)
router.get("/trainers", getAllTrainers)



// router.get("/score", getALLscore); // Route for getting all employees

module.exports = router;
