import asyncio
from prisma import Prisma
from faker import Faker
import bcrypt
import random
from datetime import datetime, timedelta
from prisma.enums import DomainEnum  
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
    await prisma.score.delete_many()
    await prisma.training.delete_many()
    await prisma.user.delete_many()
    await prisma.domain.delete_many()
    print("Cleared existing data.")

# Function to select a random gender
def random_gender():
    return random.choice(['MALE', 'FEMALE'])

# Create Admins
async def create_admins():
    admin_data = [
        {
            'firstName': faker.first_name(),
            'lastName': faker.last_name(),
            'email': generate_email(faker.first_name(), faker.last_name()),
            'password': hash_password('AdminPass123'),
            'role': 'ADMIN',
            'gender': random_gender(),  # Assign random gender
        } for _ in range(5)
    ]
    await prisma.user.create_many(data=admin_data)
    print(f"Created {len(admin_data)} admins.")

# Create Trainers
async def create_trainers():
    trainer_data = [
        {
            'firstName': faker.first_name(),
            'lastName': faker.last_name(),
            'email': generate_email(faker.first_name(), faker.last_name()),
            'password': hash_password('TrainerPass123'),
            'role': 'TRAINER',
            'gender': random_gender(),  # Assign random gender
        } for _ in range(20)
    ]
    await prisma.user.create_many(data=trainer_data)
    print(f"Created {len(trainer_data)} trainers.")

# Create Employees
async def create_employees():
    employee_data = []
    
    for _ in range(50):
        employee_data.append({
            'firstName': faker.first_name(),
            'lastName': faker.last_name(),
            'email': generate_email(faker.first_name(), faker.last_name()),
            'password': hash_password('EmployeePass123'),
            'role': 'EMPLOYEE',
            'gender': random_gender(),  # Assign random gender
        })
        if len(employee_data) == 25:  # Create in batches
            await prisma.user.create_many(data=employee_data)
            print(f"Created employees {len(employee_data) * _ + 1} to {len(employee_data) * (_ + 1)}.")
            employee_data = []  # Reset for next batch
    # Handle the remaining employees, if any
    if employee_data:
        await prisma.user.create_many(data=employee_data)
        print(f"Created employees {len(employee_data) * 2 + 1} to {len(employee_data) * 2 + len(employee_data)}.")

# Create Domains
async def create_domains():
    domain_data = [
        {'name': DomainEnum.DATA_ENGINEERING},
        {'name': DomainEnum.MACHINE_LEARNING},
        {'name': DomainEnum.FULL_STACK}
    ]
    await prisma.domain.create_many(data=domain_data)
    print(f"Created {len(domain_data)} domains.")

# Create Trainings
async def create_trainings():
    domains = await prisma.domain.find_many()  # Fetch domains for relation
    if not domains:
        print("No domains found. Skipping training creation.")
        return

    training_data = []
    
    for domain in domains:
        start_date, end_date = generate_training_dates()
        training_data.append({
            'name': f"{domain.name} Training",
            'description': f"This training focuses on {domain.name} skills and knowledge.",
            'startDate': start_date,
            'endDate': end_date,
            'domainId': domain.id,  # Foreign key to Domain
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
            assigned_trainings = random.sample(trainings, k=min(3, len(trainings)))  # Assign 3 random trainings
            for training in assigned_trainings:
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

# Create Scores for Employees in Trainings
async def create_scores():
    employees = await prisma.user.find_many(where={'role': 'EMPLOYEE'})
    trainings = await prisma.training.find_many()

    if not trainings:
        print("No trainings available to create scores.")
        return

    scores_data = []
    for employee in employees:
        assigned_trainings = await prisma.trainingassignment.find_many(
            where={'employeeId': employee.id},
            include={'training': True}
        )
        for assignment in assigned_trainings:
            score_value = random.randint(0, 100)  # Random score between 0-100
            scores_data.append({
                'value': score_value,
                'trainingId': assignment.trainingId,
                'employeeId': employee.id,
                'trainerId': assignment.training.trainerId,  # Assuming trainerId is set in the training
                'createdAt': datetime.now(),
                'updatedAt': datetime.now(),
            })

    await prisma.score.create_many(data=scores_data)
    print(f"Created scores for {len(scores_data)} training assignments.")

# Seed the data
async def seed_data():
    await prisma.connect()
    print("Connected to the database.")
    
    await clear_data()

    await create_admins()
    await create_trainers()
    await create_employees()
    await create_domains()  # Ensure domains are created before trainings
    await create_trainings()

    await assign_trainers_to_trainings()
    await assign_trainings_to_employees()
    await create_scores()

    await prisma.disconnect()
    print("Disconnected from the database.")

# Run the seed function
if __name__ == '__main__':
    asyncio.run(seed_data())
