import asyncio
from prisma import Prisma
from datetime import datetime, timedelta
import random
import string

prisma = Prisma()

def generate_unique_email(base_email):
    random_string = ''.join(random.choices(string.ascii_lowercase + string.digits, k=5))
    return f"{base_email}.{random_string}@example.com"

async def seed_data():
    await prisma.connect()

    # Create Users (Trainers and Employees)
    trainers = []
    employees = []

    for i in range(5):  # Creating 5 trainers
        trainer = await prisma.user.create(
            data={
                'firstName': f'TrainerFirstName{i}',
                'lastName': f'TrainerLastName{i}',
                'email': generate_unique_email(f'trainer{i}'),
                'password': 'password',
                'role': 'TRAINER',
                'speciality': f'Speciality {i}'
            }
        )
        trainers.append(trainer)

    for i in range(10):  # Creating 10 employees
        employee = await prisma.user.create(
            data={
                'firstName': f'EmployeeFirstName{i}',
                'lastName': f'EmployeeLastName{i}',
                'email': generate_unique_email(f'employee{i}'),
                'password': 'password',
                'role': 'EMPLOYEE',
            }
        )
        employees.append(employee)

    # Create Training Programs
    trainings = []
    for i in range(3):  # Creating 3 training programs
        training = await prisma.training.create(
            data={
                'name': f'Training Program {i}',
                'description': f'Description for Training {i}',
                'startDate': datetime.now() + timedelta(days=i),
                'endDate': datetime.now() + timedelta(days=i + 5),
            }
        )
        trainings.append(training)

    # Assign Trainers to Trainings
    for training in trainings:
        assigned_trainers = trainers[:2]  # Assign 2 trainers to each training
        for trainer in assigned_trainers:
            await prisma.training.update(
                where={'id': training.id},
                data={'trainerId': trainer.id}
            )

    # Assign Employees to Trainings
    for employee in employees:
        assigned_trainings = trainings[:2]  # Each employee assigned to 2 trainings
        for training in assigned_trainings:
            await prisma.trainingassignment.create(
                data={
                    'employeeId': employee.id,
                    'trainingId': training.id,
                }
            )

    # Create Performance Metrics
    metrics = []
    for i in range(3):  # Creating 3 performance metrics
        metric = await prisma.performancemetrics.create(
            data={
                'name': f'Metric {i}',
                'description': f'Description for Metric {i}',
                'threshold': 70,
                'increment': 10,
            }
        )
        metrics.append(metric)

    # Create Employee Performance Metrics
    for employee in employees:
        for metric in metrics:
            await prisma.employeeperformancemetric.create(
                data={
                    'employeeId': employee.id,
                    'metricId': metric.id,
                    'currentValue': 0,
                }
            )

    await prisma.disconnect()

if __name__ == '__main__':
    asyncio.run(seed_data())
