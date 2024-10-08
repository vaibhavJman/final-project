const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function to get all employees with their details including gender
const getAllEmployees = async (req, res) => {
  try {
    // Fetch all users with the role of 'EMPLOYEE', including the gender field
    const employees = await prisma.user.findMany({
      where: { role: "EMPLOYEE" }, // Ensure you are fetching employees only
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        // gender: true,  // Explicitly select the gender field (now String)
        createdAt: true,
        updatedAt: true
      },
    });

    // Return the employees in JSON format
    res.json(employees);
  } catch (error) {
    // Handle errors by returning a 500 status with the error message
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEmployees,
};
