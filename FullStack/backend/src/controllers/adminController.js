const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getTable = async (req, res) => {
  try {

    const employees = await prisma.user.findMany({
      where: { role: "EMPLOYEE" },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });


    const employeeScores = await Promise.all(
      employees.map(async (employee) => {

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
                    employeeId: employee.id, 
                  },
                  select: {
                    value: true, 
                  },
                },
              },
            },
          },
        });


        if (domains.length === 0) {
          throw new Error(`No domains found for employee ID ${employee.id}`);
        }

 
        const domainScores = domains.reduce((acc, domain) => {
          const allScores = domain.trainings.flatMap((training) =>
            training.scores.map((score) => score.value)
          );


          const avgScore =
            allScores.length > 0
              ? allScores.reduce((a, b) => a + b, 0) / allScores.length
              : 0;

          acc[domain.name] = avgScore;

          return acc;
        }, {});

        return {
          id: employee.id,
          fullName: `${employee.firstName} ${employee.lastName}`,
          email: employee.email,
          ...domainScores, 
        };
      })
    );

    res.json(employeeScores);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTable,
};
