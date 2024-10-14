const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getEmployeeCount = async (req, res) => {
  try {
    const employeeCount = await prisma.user.count({
      where: { role: "EMPLOYEE" },
    });
    res.json({ count: employeeCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAdminCount = async (req, res) => {
  try {
    const adminCount = await prisma.user.count({
      where: { role: "ADMIN" },
    });
    res.json({ count: adminCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTrainerCount = async (req, res) => {
  try {
    const trainerCount = await prisma.user.count({
      where: { role: "TRAINER" },
    });
    res.json({ count: trainerCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTrainingCount = async (req, res) => {
  try {
    const trainingCount = await prisma.training.count();
    res.json({ count: trainingCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGenderCount = async (req, res) => {
  try {
    const maleCount = await prisma.user.count({
      where: { gender: "MALE" },
    });

    const femaleCount = await prisma.user.count({
      where: { gender: "FEMALE" },
    });

    res.json({ male: maleCount, female: femaleCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTrainers = async (req, res) => {
  try {
    const trainers = await prisma.user.findMany({
      where: {
        role: "TRAINER",
      },
      include: {
        trainingsAssignedtoTrainers: {
          include: {
            domain: true,
            assignedEmployees: true,
          },
        },
      },
    });

    res.json(trainers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getAllTrainings = async (req, res)=>{
  try {
    const trainings = await prisma.training.findMany({
      include: {
        trainer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        assignedEmployees: {
          select: {
            employeeId: true, 
          },
        },
        domain: true
      },
    });

    const formattedTrainings = trainings.map(training => ({
      id: training.id,
      name: training.name,
      domainName: training.domain.name, 
      startDate: training.startDate,
      assignedEmployees: training.assignedEmployees.length, 
      trainerName: training.trainer ? `${training.trainer.firstName} ${training.trainer.lastName}` : 'N/A',
    }));

    res.json(formattedTrainings);
  } catch (error) {
    console.error("Error fetching trainings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}





module.exports = {
  getGenderCount,
  getEmployeeCount,
  getAdminCount,
  getTrainerCount,
  getTrainingCount,
  getAllTrainers,
  getAllTrainings,
 
};
