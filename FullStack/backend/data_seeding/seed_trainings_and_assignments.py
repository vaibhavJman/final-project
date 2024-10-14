import asyncio
from prisma import Prisma
from faker import Faker
import random
from datetime import datetime, timedelta

faker = Faker()
prisma = Prisma()

# Generate random training dates
def generate_training_dates():
    start_date = faker.date_between(start_date=datetime(2024, 1, 1), end_date=datetime(2024, 10, 1))
    start_date = datetime.combine(start_date, datetime.min.time())  # Convert to datetime
    end_date = start_date + timedelta(days=random.randint(10, 60))  # Random training duration between 10 to 60 days
    return start_date, end_date

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
            'description': f"This training focuses on {metric.name} skills and knowledge.",
            'startDate': start_date,
            'endDate': end_date,
            'trainerId': None,  # Placeholder for later assignment
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
    semaphore = asyncio.Semaphore(5)  # Limit concurrent tasks

    async def assign_training(employee):
        async with semaphore:
            # Select unique trainings to assign
            assigned_trainings = random.sample(trainings, k=min(3, len(trainings)))  # Assign 3 unique trainings
            for training in assigned_trainings:
                # Check for existing training assignment
                existing_assignment = await prisma.trainingassignment.find_first(
                    where={
                        'employeeId': employee.id,
                        'trainingId': training.id
                    }
                )
                if not existing_assignment:
                    await prisma.trainingassignment.create(
                        data={
                            'employeeId': employee.id,
                            'trainingId': training.id,
                            'createdAt': datetime.now(),
                            'updatedAt': datetime.now(),
                        }
                    )
            await asyncio.sleep(0.1)  # Small delay to prevent overwhelming the database

    await asyncio.gather(*(assign_training(employee) for employee in employees))
    print(f"Assigned trainings to {len(employees)} employees.")

# Initialize Employee Performance Metrics
async def initialize_employee_performance_metrics():
    employees = await prisma.user.find_many(where={'role': 'EMPLOYEE'})
    metrics = await prisma.performancemetrics.find_many()

    if not employees or not metrics:
        print("No employees or performance metrics available to initialize.")
        return

    semaphore = asyncio.Semaphore(5)  # Limit to 5 concurrent operations

    async def create_performance_metric(employee, metric):
        async with semaphore:
            await prisma.employeeperformancemetric.create(
                data={
                    'employeeId': employee.id,
                    'metricId': metric.id,
                    'currentValue': 0  # Initialize to 0
                }
            )

    tasks = [create_performance_metric(employee, metric) for employee in employees for metric in metrics]
    await asyncio.gather(*tasks)
    print(f"Initialized performance metrics for {len(employees)} employees.")

# Create Scores for Employees' Trainings
async def create_scores_for_trainings():
    assignments = await prisma.trainingassignment.find_many(include={'training': True, 'employee': True})
    metrics = await prisma.performancemetrics.find_many()
    
    if not assignments or not metrics:
        print("No assignments or metrics available.")
        return

    tasks = []
    for assignment in assignments:
        # Randomly assign scores for the associated metric
        for metric in metrics:
            # Define random values for required fields
            score_value = random.randint(40, 100)  # Random score between 40 and 100
            threshold1 = 50  # Example value for threshold1
            threshold2 = 70  # Example value for threshold2
            performanceInc1 = 1  # Example value for performanceInc1
            performanceInc2 = 2  # Example value for performanceInc2
            
            tasks.append(prisma.score.create(
                data={
                    'employeeId': assignment.employeeId,
                    'trainingId': assignment.trainingId,
                    'metricId': metric.id,
                    'value': score_value,
                    'threshold1': threshold1,
                    'threshold2': threshold2,
                    'performanceInc1': performanceInc1,
                    'performanceInc2': performanceInc2
                }
            ))

    await asyncio.gather(*tasks)
    print(f"Created scores for {len(assignments)} training assignments.")


# Update Performance Metrics Based on Training Scores
async def update_performance_metrics():
    training_assignments = await prisma.trainingassignment.find_many(include={'employee': True, 'training': True})

    tasks = []
    for assignment in training_assignments:
        # Retrieve the scores associated with the training assignment
        scores = await prisma.score.find_many(
            where={
                'trainingId': assignment.trainingId,
                'employeeId': assignment.employeeId
            }
        )

        for score in scores:
            # Access the associated metric
            metric = await prisma.performancemetrics.find_unique(where={'id': score.metricId})

            if metric:
                new_value = 0  # Start from 0 for new value
                
                if score.value > metric.threshold:
                    new_value += metric.increment

                # Update the EmployeePerformanceMetric for the employee and metric
                employee_metrics = await prisma.employeeperformancemetric.find_first(
                    where={
                        'employeeId': assignment.employeeId,
                        'metricId': metric.id
                    }
                )

                if employee_metrics:
                    new_value = min(employee_metrics.currentValue + new_value, metric.threshold)  
                    
                    tasks.append(prisma.employeeperformancemetric.update(
                        where={'id': employee_metrics.id},
                        data={'currentValue': new_value}
                    ))

    await asyncio.gather(*tasks)
    print(f"Updated performance metrics based on training scores.")

# Seed the data for trainings and assignments
async def seed_trainings_and_assignments():
    await prisma.connect()
    print("Connected to the database.")
    
    await create_trainings()
    await assign_trainers_to_trainings()
    await assign_trainings_to_employees()
    await initialize_employee_performance_metrics()  # Step to initialize employee performance metrics
    await create_scores_for_trainings()  # Step to create scores for employees' trainings
    await update_performance_metrics()  # Step to update performance metrics based on training scores
    
    await prisma.disconnect()
    print("Disconnected from the database.")

# Run the seeding function
if __name__ == '__main__':
    asyncio.run(seed_trainings_and_assignments())
