import asyncio
from prisma import Prisma
from datetime import datetime, timedelta
import random
import bcrypt
from faker import Faker

prisma = Prisma()
faker = Faker()


async def clean_database():
    """Deletes all records from tables to avoid duplication."""
    await prisma.trainingassignment.delete_many()  # Delete all training assignments
    await prisma.training.delete_many()            # Delete all trainings
    # Delete all performance metrics assigned to employees
    await prisma.employeeperformancemetric.delete_many()
    await prisma.performancemetrics.delete_many()  # Delete all performance metrics
    # Delete all users (admins, trainers, employees)
    await prisma.user.delete_many()


def generate_email(first_name, last_name):
    """Generates email in the format firstname.lastnameXX@gmail.com"""
    return f"{first_name.lower()}.{last_name.lower()}{random.randint(10, 99)}@gmail.com"


def encrypt_password(password):
    """Encrypts the password using bcrypt."""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


async def seed_data():
    await prisma.connect()

    # Step 1: Clean the database
    await clean_database()

    # Step 1: Create 5 Admins
    admins = []
    for _ in range(5):
        first_name = faker.first_name()
        last_name = faker.last_name()
        admin = await prisma.user.create(
            data={
                'firstName': first_name,
                'lastName': last_name,
                'email': generate_email(first_name, last_name),
                'password': encrypt_password('password'),
                'role': 'ADMIN',
            }
        )
        admins.append(admin)

    # Step 2: Create at least 20 Trainers with specialties
    specialties = ['Data Science', 'Data Engineering', 'Gen AI', 'Full Stack', 'Problem Solving',
                   'Leadership', 'Frontend', 'Backend']
    trainers = []
    for _ in range(20):
        first_name = faker.first_name()
        last_name = faker.last_name()
        trainer = await prisma.user.create(
            data={
                'firstName': first_name,
                'lastName': last_name,
                'email': generate_email(first_name, last_name),
                'password': encrypt_password('password'),
                'role': 'TRAINER',
                'speciality': random.choice(specialties),
            }
        )
        trainers.append(trainer)

    # Step 3: Create at least 100 Employees
    employees = []
    for _ in range(100):
        first_name = faker.first_name()
        last_name = faker.last_name()
        employee = await prisma.user.create(
            data={
                'firstName': first_name,
                'lastName': last_name,
                'email': generate_email(first_name, last_name),
                'password': encrypt_password('password'),
                'role': 'EMPLOYEE',
            }
        )
        employees.append(employee)

    # Step 4: Create 5 Job Performance Metrics
    metrics = ['Full Stack', 'Data Engineering',
               'Data Science', 'Problem Solving', 'Leadership']
    performance_metrics = []
    for metric in metrics:
        pm = await prisma.performancemetrics.create(
            data={
                'name': metric,
                'description': f'{metric} performance metric',
                'threshold': 3,
                'increment': 1,
            }
        )
        performance_metrics.append(pm)

    # Step 5: Create 5 Trainings related to the performance metrics
    start_date = datetime(2024, 1, 1)
    trainings = []
    for i, metric in enumerate(metrics):
        # Random duration between 30 and 60 days
        end_date = start_date + timedelta(days=random.randint(30, 60))
        training = await prisma.training.create(
            data={
                'name': f'Training {i} - {metric}',
                'description': f'Training for {metric}',
                'startDate': start_date,
                'endDate': end_date,
            }
        )
        trainings.append(training)
        # Next training starts 10-20 days after previous ends
        start_date = end_date + timedelta(days=random.randint(10, 20))

    # Step 6: Assign Trainers to Trainings
    for training in trainings:
        # Assign 2-3 trainers per training
        selected_trainers = random.sample(trainers, k=random.randint(2, 3))
        for trainer in selected_trainers:
            await prisma.training.update(
                where={'id': training.id},
                data={'trainerId': trainer.id}
            )

    # Step 7: Assign Employees to Trainings and Update Performance Metrics
    for employee in employees:
        for training in trainings:
            # Check if any performance metrics are less than 3 before assigning another training
            employee_performance = await prisma.employeeperformancemetric.find_many(
                where={'employeeId': employee.id}
            )
            if any(metric['currentValue'] < 3 for metric in employee_performance):
                # Assign the employee to the training
                await prisma.trainingassignment.create(
                    data={
                        'employeeId': employee.id,
                        'trainingId': training.id,
                    }
                )

                # Simulate a training score
                score = random.randint(50, 100)

                # Update performance metrics based on the score
                for metric in performance_metrics:
                    if score > 50:
                        increment = 1 if score <= 70 else 2
                        await prisma.employeeperformancemetric.update(
                            where={'employeeId': employee.id,
                                   'metricId': metric.id},
                            data={'currentValue': {
                                'increment': increment,
                            }}
                        )

    await prisma.disconnect()

if __name__ == '__main__':
    asyncio.run(seed_data())
