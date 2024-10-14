const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getTrainersByID = async (req, res) => {
  try {
    const { userId } = req.params;
    const trainerId = parseInt(userId, 10);

    if (isNaN(trainerId)) {
      return res.status(400).json({ error: "Invalid user ID provided" });
    }

  const trainings = await prisma.training.findMany({
    where: {
      trainerId: trainerId,
    },
    select: {
      assignedEmployees: {
        include:{
          employee: true
        }
      }, 
      scores: true,
      domain: true,
      name:true
    },
  });
  // console.log(trainings)
  res.json(trainings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const updateEmployeeScore = async (req, res) => {
  try {
    const { scoreId } = req.params;
    const { value } = req.body;

    const updatedScore = await prisma.score.update({
      where: { id: parseInt(scoreId, 10) },
      data: { value: parseFloat(value) },
    });

    res.json(updatedScore);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTrainersByID,
  updateEmployeeScore
};
