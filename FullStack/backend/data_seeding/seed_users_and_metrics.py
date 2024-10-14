import asyncio
from prisma import Prisma
from faker import Faker
import bcrypt
import random

faker = Faker()
prisma = Prisma()

# Function to hash passwords
def hash_password(password):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

# Random email generator
def generate_email(first_name, last_name):
    return f'{first_name.lower()}.{last_name.lower()}{random.randint(10, 99)}@gmail.com'

# Clear existing data (for users and metrics)
async def clear_user_and_metric_data():
    # First, clear data from the EmployeePerformanceMetric table
    await prisma.employeeperformancemetric.delete_many()
    print("Cleared employee performance metrics.")

    # Then, clear data from the Score table (if necessary)
    await prisma.score.delete_many()
    print("Cleared scores.")

    # Then, clear data from the TrainingAssignment table (if necessary)
    await prisma.trainingassignment.delete_many()
    print("Cleared training assignments.")
    
    # Finally, clear the PerformanceMetrics table
    await prisma.performancemetrics.delete_many()
    print("Cleared performance metrics.")
    
    # Optionally clear Users (if required for your logic)
    await prisma.user.delete_many()
    print("Cleared users.")

# Create Admins
async def create_admins():
    admin_data = [
        {
            'firstName': faker.first_name(),
            'lastName': faker.last_name(),
            'email': generate_email(faker.first_name(), faker.last_name()),
            'password': hash_password('AdminPass123'),
            'role': 'ADMIN',
            'isTrainerAssigned': False
        } for _ in range(5)
    ]
    await prisma.user.create_many(data=admin_data)
    print(f"Created {len(admin_data)} admins.")

# Create Trainers
async def create_trainers():
    trainer_specialties = ['Data Science', 'Data Engineering', 'GEN AI', 'Full Stack', 'Problem Solving', 'Leadership', 'Frontend', 'Backend']
    trainer_data = [
        {
            'firstName': faker.first_name(),
            'lastName': faker.last_name(),
            'email': generate_email(faker.first_name(), faker.last_name()),
            'password': hash_password('TrainerPass123'),
            'role': 'TRAINER',
            'speciality': random.choice(trainer_specialties),
            'isTrainerAssigned': False
        } for _ in range(20)
    ]
    await prisma.user.create_many(data=trainer_data)
    print(f"Created {len(trainer_data)} trainers.")

# Create Employees
async def create_employees():
    employee_data = []
    
    for _ in range(50):  # Modify this number to adjust employee count
        employee_data.append({
            'firstName': faker.first_name(),
            'lastName': faker.last_name(),
            'email': generate_email(faker.first_name(), faker.last_name()),
            'password': hash_password('EmployeePass123'),
            'role': 'EMPLOYEE',
            'isTrainerAssigned': False
        })
        if len(employee_data) == 50:  # Create in batches
            await prisma.user.create_many(data=employee_data)
            print(f"Created {len(employee_data) * _ + 1} to {len(employee_data) * (_ + 1)}.")
            employee_data = []  # Reset for next batch
    if employee_data:
        await prisma.user.create_many(data=employee_data)
        print(f"Created remaining employees.")

# Create Job Performance Metrics
async def create_performance_metrics():
    metrics = ['Full Stack', 'Data Engineering', 'Data Science', 'Problem Solving', 'Leadership']
    
    metric_data = [
        {
            'name': metric,
            'threshold': 50,
            'increment': 1
        } for metric in metrics
    ]
    
    await prisma.performancemetrics.create_many(data=metric_data)
    print(f"Created {len(metric_data)} performance metrics.")

# Seed the data for users and performance metrics
async def seed_users_and_metrics():
    await prisma.connect()
    print("Connected to the database.")
    
    await clear_user_and_metric_data()
    await create_admins()
    await create_trainers()
    await create_employees()
    await create_performance_metrics()
    
    await prisma.disconnect()
    print("Disconnected from the database.")

# Run the seeding function
if __name__ == '__main__':
    asyncio.run(seed_users_and_metrics())
