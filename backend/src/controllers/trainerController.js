const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getTrainersByID = async (req, res) => {
  try {
    const { userId } = req.params;
  const trainings = await prisma.training.findMany({
    where: {
      trainerId: userId, // Fetch trainings assigned to this trainer
    },
    include: {
      assignedEmployees: true, // Include employees enrolled in this training
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
