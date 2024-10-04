

const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

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
  const adminData = Array.from({ length: 5 }, (_, i) => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: `admin.${i + 1}@example.com`,
    password: bcrypt.hashSync('Admin123!', 10),
    role: 'ADMIN',
  }));
  await prisma.user.createMany({ data: adminData });

  // 3. Create trainers with unique emails
  console.log("Seeding 20 trainers...");
  const trainerSpecialties = ['Data Science', 'Data Engineering', 'GEN AI', 'Full Stack', 'Problem Solving', 'Leadership', 'Frontend', 'Backend'];
  const trainerEmails = new Set();
  const trainerData = [];

  while (trainerData.length < 20) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const randomNumber = faker.number.int({ min: 10, max: 99 });
    const email = `trainer.${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNumber}@example.com`;

    if (!trainerEmails.has(email)) {
      trainerEmails.add(email);
      trainerData.push({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync('Trainer123!', 10),
        role: 'TRAINER',
        speciality: faker.helpers.arrayElement(trainerSpecialties),
      });
    }
  }
  await prisma.user.createMany({ data: trainerData });

  // 4. Create employees with unique emails
  console.log("Seeding 100 employees...");
  const employeeEmails = new Set();
  const employeeData = [];

  while (employeeData.length < 100) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const randomNumber = faker.number.int({ min: 10, max: 99 });
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNumber}@gmail.com`;

    if (!employeeEmails.has(email)) {
      employeeEmails.add(email);
      employeeData.push({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync('Employee123!', 10),
        role: 'EMPLOYEE',
      });
    }
  }
  await prisma.user.createMany({ data: employeeData });

  // 5. Create performance metrics
  console.log("Creating performance metrics...");
  const performanceMetrics = [
    {
      name: 'Code Quality',
      description: 'Evaluation of code quality based on standards and best practices',
      CurrentValue: 0,
    },
    {
      name: 'Full Stack Development',
      description: 'Assessment of skills in both frontend and backend development',
      CurrentValue: 0,
    },
    {
      name: 'Data Engineering',
      description: 'Evaluation of skills related to data processing and architecture',
      CurrentValue: 0,
    },
    {
      name: 'Problem Solving',
      description: 'Measurement of the ability to analyze and solve problems effectively',
      CurrentValue: 0,
    },
    {
      name: 'Leadership',
      description: 'Assessment of leadership skills and the ability to manage teams',
      CurrentValue: 0,
    },
  ];

  const createdMetrics = await prisma.performanceMetrics.createMany({
    data: performanceMetrics.map(metric => ({
      name: metric.name,
      description: metric.description,
      CurrentValue: metric.CurrentValue,
    })),
  });

  // 6. Create training sessions
  console.log("Creating training sessions...");
  const trainingSessions = [];

  for (let i = 0; i < performanceMetrics.length; i++) {
    const startDate = faker.date.future(); // Generate a random future date for training start
    const endDate = new Date(startDate); // Create a new date object based on the start date
    endDate.setDate(endDate.getDate() + faker.number.int({ min: 1, max: 10 })); // Set end date 1 to 10 days after start date

    // Randomly select a performance metric name for the training title
    const trainingTitle = faker.helpers.arrayElement(performanceMetrics.map(metric => metric.name));

    const training = await prisma.training.create({
      data: {
        name: trainingTitle,         // Use the selected metric name as the title
        description: faker.lorem.sentence(), // Description of the training
        startDate: startDate,         // Set the start date
        endDate: endDate,             // Set the end date
        trainerId: faker.helpers.arrayElement(trainerData).id, // Randomly select a trainer
      },
    });
    trainingSessions.push(training);
  }

  console.log("Training sessions created successfully.");
}

main()
  .catch(e => {
    console.error("Error during the seeding process: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
