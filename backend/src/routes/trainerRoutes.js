const express = require("express");
const { getTrainersByID } = require("../controllers/trainerController");


const router = express.Router();

router.post("/trainings/:userId", getTrainersByID);



module.exports = router;
