const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function checkSchema() {
  try {
    const result = await prisma.$queryRaw`SELECT column_name, data_type 
                                          FROM information_schema.columns 
                                          WHERE table_name = 'User';`;
    console.log(result);
  } catch (error) {
    console.error("Error fetching schema:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSchema();
