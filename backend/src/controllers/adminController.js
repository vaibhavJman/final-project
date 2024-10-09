const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getTable = async (req, res) => {
  try {
    // Fetch all employees with the role of 'EMPLOYEE'
    const employees = await prisma.user.findMany({
      where: { role: "EMPLOYEE" },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    // Iterate over each employee to fetch their domain scores
    const employeeScores = await Promise.all(
      employees.map(async (employee) => {
        // Fetch domains associated with specific names
        const domains = await prisma.domain.findMany({
          where: {
            name: {
              in: ["DATA_ENGINEERING", "MACHINE_LEARNING", "FULL_STACK"],
            },
          },
          select: {
            name: true,
            trainings: {
              select: {
                id: true,
                scores: {
                  where: {
                    employeeId: employee.id, // Fetch scores for the current employee
                  },
                  select: {
                    value: true, // Select score value
                  },
                },
              },
            },
          },
        });

        // If no domains are found, throw an error
        if (domains.length === 0) {
          throw new Error(`No domains found for employee ID ${employee.id}`);
        }

        // Calculate average scores for each domain
        const domainScores = domains.reduce((acc, domain) => {
          const allScores = domain.trainings.flatMap((training) =>
            training.scores.map((score) => score.value)
          );

          // Calculate average score
          const avgScore =
            allScores.length > 0
              ? allScores.reduce((a, b) => a + b, 0) / allScores.length
              : 0;

          // Store average score in accumulator
          acc[domain.name] = avgScore;

          return acc;
        }, {});

        return {
          id: employee.id,
          fullName: `${employee.firstName} ${employee.lastName}`,
          email: employee.email,
          ...domainScores, // Include domain scores in the returned object
        };
      })
    );

    // Return the employee scores in JSON format
    res.json(employeeScores);
  } catch (error) {
    // Handle errors by returning a 500 status with the error message
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTable,
};
