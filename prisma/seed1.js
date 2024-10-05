const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

function getRandomDate(startDate, endDate) {
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();
  const randomTimestamp = Math.random() * (endTimestamp - startTimestamp) + startTimestamp;
  return new Date(randomTimestamp);
}

async function main() {
  console.log("Starting the seeding process...");

  // 1. Cleanup previous data
  console.log("Cleaning up previous data...");
  await prisma.trainingAssignment.deleteMany({});
  await prisma.score.deleteMany({});
  await prisma.performanceMetrics.deleteMany({});
  await prisma.training.deleteMany({});
  await prisma.user.deleteMany({ where: { role: 'EMPLOYEE' } });
  await prisma.user.deleteMany({ where: { role: 'TRAINER' } });
  await prisma.user.deleteMany({ where: { role: 'ADMIN' } });

  // 2. Create admins
  console.log("Seeding 5 admins...");
  for (let i = 0; i < 5; i++) {
    await prisma.user.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: `admin.${i + 1}@example.com`,
        password: await bcrypt.hash('Admin123!', 10),
        role: 'ADMIN',
      },
    });
  }

  // 3. Create trainers
  console.log("Seeding 20 trainers...");
  const trainerSpecialties = ['Data Science', 'Data Engineering', 'GEN AI', 'Full Stack', 'Problem Solving', 'Leadership', 'Frontend', 'Backend'];
  for (let i = 0; i < 20; i++) {
    await prisma.user.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: `trainer.${i + 1}@example.com`,
        password: await bcrypt.hash('Trainer123!', 10),
        role: 'TRAINER',
        speciality: faker.helpers.arrayElement(trainerSpecialties),
      },
    });
  }

  // 4. Create employees
  console.log("Seeding 100 employees...");
  for (let i = 0; i < 100; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const randomNumber = faker.number.int({ min: 10, max: 99 }); // Random 2-digit number
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNumber}@gmail.com`; // Generate email

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: await bcrypt.hash('Employee123!', 10),
        role: 'EMPLOYEE',
      },
    });
  }

  // 5. Create job performance metrics with initial value 0
  console.log("Creating performance metrics...");
  const performanceMetrics = ['Full Stack', 'Data Engineering', 'Data Science', 'Problem Solving', 'Leadership'];
  for (const metric of performanceMetrics) {
    await prisma.performanceMetrics.create({
      data: {
        name: metric,
        description: `${metric} performance evaluation`,
        CurrentValue: faker.number.int({ min: 0, max: 5 }), // Initialize with a random value between 0-5
      },
    });
  }

  // 6. Create trainings based on the performance metrics
  console.log("Creating trainings...");
  const metrics = await prisma.performanceMetrics.findMany(); // Retrieve all performance metrics
  const today = new Date(); // Today's date
  const startDateLimit = new Date('2023-12-01'); // Start date limit

  for (const metric of metrics) {
    const startDate = getRandomDate(startDateLimit, today); // Random start date
    const endDate = getRandomDate(startDate, today); // Random end date after start date

    await prisma.training.create({
      data: {
        name: `${metric.name} Training`,
        description: `Training for improving ${metric.name}`,
        startDate: startDate,
        endDate: endDate,
        trainerId: await getRandomTrainerId(), // Assign a random trainer
      },
    });
  }

  // 7. Assign employees to trainings and generate scores
  console.log("Assigning employees to trainings and creating scores...");
  const assignedTrainings = new Set();
  const employees = await prisma.user.findMany({ where: { role: 'EMPLOYEE' } });
  const trainings = await prisma.training.findMany(); // Retrieve all trainings
  const metricsForScores = await prisma.performanceMetrics.findMany(); // Retrieve all performance metrics for score assignment

  for (const employee of employees) {
    // Randomly decide if the employee will be assigned to training
    const willBeAssigned = Math.random() < 0.7; // 70% chance to be assigned to a training
    if (willBeAssigned) {
      const trainingCount = faker.number.int({ min: 1, max: 3 }); // Limit number of trainings per employee (1 to 3)
      for (let i = 0; i < trainingCount; i++) {
        let training = trainings[Math.floor(Math.random() * trainings.length)];

        // Ensure unique (employeeId, trainingId) pair
        while (assignedTrainings.has(`${employee.id}-${training.id}`)) {
          training = trainings[Math.floor(Math.random() * trainings.length)];
        }

        assignedTrainings.add(`${employee.id}-${training.id}`);

        const scoreValue = faker.number.int({ min: 0, max: 5 }); // Performance metrics in the range of 0-5

        // Create the training assignment
        await prisma.trainingAssignment.create({
          data: {
            employeeId: employee.id,
            trainingId: training.id,
            isAssigned: i === trainingCount - 1, // Mark the last one as the current training
          },
        });

        // Create the scores for each performance metric
        for (const metric of metricsForScores) {
          const performanceIncrease = scoreValue > 3 ? 1 : 0; // Adjust thresholds as needed
          await prisma.score.create({
            data: {
              value: scoreValue,
              threshold1: 2,
              threshold2: 4,
              performanceInc1: 1,
              performanceInc2: 2,
              employeeId: employee.id,
              trainingId: training.id,
              metricId: metric.id,
            },
          });

          // Update the performance metrics, but limit the increment
          await prisma.performanceMetrics.update({
            where: { id: metric.id },
            data: {
              CurrentValue: {
                increment: Math.min(performanceIncrease, 5 - (await prisma.performanceMetrics.findUnique({ where: { id: metric.id } })).CurrentValue),
              },
            },
          });
        }
      }
    } 
  }

  console.log("Seeding completed successfully.");
}

// Helper function to get a random trainer ID
async function getRandomTrainerId() {
  const trainers = await prisma.user.findMany({ where: { role: 'TRAINER' } });
  const randomIndex = Math.floor(Math.random() * trainers.length);
  return trainers[randomIndex].id;
}

main()
  .catch(e => {
    console.error("Error during the seeding process: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
