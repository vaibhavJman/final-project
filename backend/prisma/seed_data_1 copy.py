import asyncio
from prisma import Prisma
from faker import Faker
import bcrypt
import random
from datetime import datetime, timedelta

faker = Faker()
prisma = Prisma()

# Function to hash passwords
def hash_password(password):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

# Random email generator
def generate_email(first_name, last_name):
    return f'{first_name.lower()}.{last_name.lower()}{random.randint(10, 99)}@gmail.com'

# Training date generator
def generate_training_dates():
    start_date = faker.date_between(start_date=datetime(2024, 1, 1), end_date=datetime(2024, 10, 1))
    start_date = datetime.combine(start_date, datetime.min.time())  # Convert to datetime
    end_date = start_date + timedelta(days=random.randint(10, 60))  # Random training duration between 10 to 60 days
    return start_date, end_date

# Clear existing data
async def clear_data():
    await prisma.trainingassignment.delete_many()
    await prisma.training.delete_many()
    await prisma.performancemetrics.delete_many()
    await prisma.user.delete_many()
    print("Cleared existing data.")

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
    employee_data = [
        {
            'firstName': faker.first_name(),
            'lastName': faker.last_name(),
            'email': generate_email(faker.first_name(), faker.last_name()),
            'password': hash_password('EmployeePass123'),
            'role': 'EMPLOYEE',
            'isTrainerAssigned': False
        } for _ in range(100)
    ]
    await prisma.user.create_many(data=employee_data)
    print(f"Created {len(employee_data)} employees.")

# Create Job Performance Metrics
async def create_performance_metrics():
    metrics = ['Full Stack', 'Data Engineering', 'Data Science', 'Problem Solving', 'Leadership']
    
    metric_data = [
        {
            'name': metric,
            'threshold': 3,
            'increment': 1
        } for metric in metrics
    ]
    
    await prisma.performancemetrics.create_many(data=metric_data)
    print(f"Created {len(metric_data)} performance metrics.")

# Create Trainings
async def create_trainings():
    metrics = await prisma.performancemetrics.find_many()  # Fetch performance metrics for relation
    if not metrics:
        print("No performance metrics found. Skipping training creation.")
        return

    training_data = []
    
    for metric in metrics:
        start_date, end_date = generate_training_dates()
        training_data.append({
            'name': metric.name + ' Training',
            'startDate': start_date,
            'endDate': end_date,
            'trainerId': None,  # Placeholder for later assignment
            'performance_metric_id': metric.id  # Ensure this is linked to the performance metric
        })

    await prisma.training.create_many(data=training_data)
    print(f"Created {len(training_data)} trainings.")

# Assign Trainers to Trainings
async def assign_trainers_to_trainings():
    trainers = await prisma.user.find_many(where={'role': 'TRAINER'})
    trainings = await prisma.training.find_many()

    if not trainings:
        print("No trainings available to assign trainers to.")
        return

    tasks = []
    for training in trainings:
        trainer = random.choice(trainers)
        tasks.append(prisma.training.update(
            where={'id': training.id},
            data={'trainerId': trainer.id}  # Assigning trainer to the training
        ))
    
    await asyncio.gather(*tasks)
    print(f"Assigned trainers to {len(trainings)} trainings.")

# Assign Trainings to Employees
async def assign_trainings_to_employees():
    employees = await prisma.user.find_many(where={'role': 'EMPLOYEE'})
    trainings = await prisma.training.find_many()
    
    if not trainings:
        print("No trainings available to assign to employees.")
        return

    tasks = []
    for employee in employees:
        assigned_trainings = random.sample(trainings, k=min(3, len(trainings)))  # Assign 3 random trainings or less if not enough
        for training in assigned_trainings:
            tasks.append(prisma.trainingassignment.create(
                data={
                    'employeeId': employee.id,
                    'trainingId': training.id,
                    'createdAt': datetime.now(),
                    'updatedAt': datetime.now(),
                }
            ))
    await asyncio.gather(*tasks)
    print(f"Assigned trainings to {len(employees)} employees.")

# Update Performance Metrics Based on Training Scores
async def update_performance_metrics():
    training_assignments = await prisma.trainingassignment.find_many(include={'employee': True, 'training': True})
    
    tasks = []
    for assignment in training_assignments:
        employee_metrics = await prisma.employeeperformancemetric.find_first(
            where={
                'employeeId': assignment.employeeId,
                'metricId': assignment.training.performance_metric_id
            }
        )

        if employee_metrics:
            new_value = employee_metrics.currentValue
            if assignment.score > 50:
                new_value += 1
            if assignment.score > 70:
                new_value += 2
            
            new_value = min(new_value, 5)  # Ensure new value does not exceed threshold
            tasks.append(prisma.employeeperformancemetric.update(
                where={'id': employee_metrics.id},
                data={'currentValue': new_value}
            ))
    
    await asyncio.gather(*tasks)
    print(f"Updated performance metrics based on training scores.")

# Seed the data
async def seed_data():
    await prisma.connect()
    print("Connected to the database.")
    
    await clear_data()

    await asyncio.gather(
        create_admins(),
        create_trainers(),
        create_employees(),
        create_performance_metrics(),
        create_trainings()
    )

    await assign_trainers_to_trainings()
    await assign_trainings_to_employees()
    await update_performance_metrics()

    await prisma.disconnect()
    print("Disconnected from the database.")

# Run the seed function
if __name__ == '__main__':
    asyncio.run(seed_data())
