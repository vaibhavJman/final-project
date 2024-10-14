
const express = require("express");
const { getTable } = require("../controllers/adminController");
const { getGenderCount, getEmployeeCount, getAdminCount, getTrainerCount, getTrainingCount, getAllTrainers, getAllTrainings} = require("../controllers/employeeController"); // Ensure this import is correct

const router = express.Router();


router.get("/table", getTable); 
// router.get("/employee", getAllEmployees);
router.get("/gendercount",getGenderCount);
router.get("/employeecount",getEmployeeCount)
router.get("/adminCount",getAdminCount)
router.get("/trainerCount",getTrainerCount)
router.get("/trainingCount",getTrainingCount)
router.get("/trainers", getAllTrainers)
router.get("/trainings", getAllTrainings)


module.exports = router;
