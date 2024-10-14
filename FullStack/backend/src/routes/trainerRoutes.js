const express = require("express");
const { getTrainersByID } = require("../controllers/trainerController");
const { protect } = require("../middlewares/authMiddleware");


const router = express.Router();

router.get("/trainings/:userId",protect, getTrainersByID);



module.exports = router;
