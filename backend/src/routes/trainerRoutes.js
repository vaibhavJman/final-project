const express = require("express");
const { getTrainersByID } = require("../controllers/trainerController");


const router = express.Router();

router.get("/trainings/:userId", getTrainersByID);



module.exports = router;
