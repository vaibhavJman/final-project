const express = require("express");
const { getTrainersByID, updateEmployeeScore } = require("../controllers/trainerController");
const { protect } = require("../middlewares/authMiddleware");


const router = express.Router();

router.get("/trainings/:userId",protect, getTrainersByID);
router.put("/update-score/:scoreId", protect, updateEmployeeScore);



module.exports = router;
