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
    include: {
      assignedEmployees: {
        include:{
          employee: true
        }
      }, 
      scores: true,
      domain: true
    },
  });
  res.json(trainings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTrainersByID,
};
