const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// const getAllEmployees = async (req, res) => {
//   try {
//     // Fetch all users with the role of 'EMPLOYEE', including the gender field
//     const employees = await prisma.user.findMany({
//       where: { role: "EMPLOYEE" }, // Ensure you are fetching employees only
//       select: {
//         id: true,
//         firstName: true,
//         lastName: true,
//         email: true,
//         gender: true,  // Explicitly select the gender field (now String)
//         createdAt: true,
//         updatedAt: true
//       },
//     }); 

//     // Return the employees in JSON format
//     res.json(employees);
//   } catch (error) {
//     // Handle errors by returning a 500 status with the error message
//     res.status(500).json({ error: error.message });
//   }
// };



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
      where: { gender: "MALE" }
    });

    const femaleCount = await prisma.user.count({
      where: {  gender: "FEMALE" }
    });

    res.json({ male: maleCount, female: femaleCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const getAllTrainers =  async (req, res) => {
    try{

const trainers = await prisma.user.findMany({
  where: {
    role : "TRAINER"
  },
  include: {
    trainingsAssignedtoTrainers: 
    {
      include: {
        domain: true,
        assignedEmployees: true
      }
    }
    
  } 
})

res.json(trainers)
    }catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

// const getALLscore = async (req, res) => {
//   try{
//     const scores = await prisma.score.groupBy({
//       by : ["employeeId"],
//       _avg: {
//         value: true
//       },
//       orderBy: {
//         _avg: "desc"
//       }
//     })
//     res.json(scores);
//   }catch(error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// const getHello = async (req, res) => {
//   res.json("Hello There")
// }


module.exports = {
  getGenderCount, getEmployeeCount, getAdminCount, getTrainerCount, getTrainingCount,getAllTrainers,
  // getALLscore
};
