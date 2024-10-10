import csv
import random
from faker import Faker
import os 
from datetime import datetime, timedelta
from prisma.enums import DomainEnum

faker = Faker()

# Random email generator
def generate_email(first_name, last_name):
    return f'{first_name.lower()}.{last_name.lower()}{random.randint(10, 99)}@gmail.com'

# Generate random gender
def random_gender():
    return random.choice(['MALE', 'FEMALE'])

# Generate training dates
def generate_training_dates():
    start_date = faker.date_between(start_date=datetime(2024, 1, 1), end_date=datetime(2024, 10, 1))
    end_date = start_date + timedelta(days=random.randint(10, 60))
    return start_date, end_date

# Create Admins
def create_admins(num_admins=5):
    admin_data = []
    for _ in range(num_admins):
        admin_data.append({
            'firstName': faker.first_name(),
            'lastName': faker.last_name(),
            'email': generate_email(faker.first_name(), faker.last_name()),
            'password': 'AdminPass123',
            'role': 'ADMIN',
            'gender': random_gender(),
        })
    return admin_data

# Create Trainers
def create_trainers(num_trainers=20):
    trainer_data = []
    for _ in range(num_trainers):
        trainer_data.append({
            'firstName': faker.first_name(),
            'lastName': faker.last_name(),
            'email': generate_email(faker.first_name(), faker.last_name()),
            'password': 'TrainerPass123',
            'role': 'TRAINER',
            'gender': random_gender(),
        })
    return trainer_data

# Create Employees
def create_employees(num_employees=50):
    employee_data = []
    for _ in range(num_employees):
        employee_data.append({
            'firstName': faker.first_name(),
            'lastName': faker.last_name(),
            'email': generate_email(faker.first_name(), faker.last_name()),
            'password': 'EmployeePass123',
            'role': 'EMPLOYEE',
            'gender': random_gender(),
        })
    return employee_data

# Create Domains
def create_domains():
    return [
        {'name': "DATA_ENGINEERING"},
        {'name': "MACHINE_LEARNING"},
        {'name': "FULL_STACK"},
    ]

# Create Trainings
def create_trainings(domains):
    training_data = []
    for domain in domains:
        start_date, end_date = generate_training_dates()
        training_data.append({
            'name': f"{domain['name']} Training",
            'description': f"This training focuses on {domain['name']} skills and knowledge.",
            'startDate': start_date,
            'endDate': end_date,
            'domainId': domain['name'],  # Just using the name for simplicity
            'trainerId': None,  # Placeholder for trainer assignment
        })
    return training_data

# Create Scores
def create_scores(employees, trainings):
    scores_data = []
    for employee in employees:
        for training in random.sample(trainings, k=min(3, len(trainings))):  # Randomly assign scores for up to 3 trainings
            score_value = random.randint(0, 100)  # Random score between 0-100
            scores_data.append({
                'value': score_value,
                'trainingId': training['name'],  # Using training name for simplicity
                'employeeId': f"{employee['firstName']} {employee['lastName']}",  # Simple ID representation
                'trainerId': None,  # Placeholder for trainer ID
            })
    return scores_data

# Function to write data to CSV
def write_to_csv(filename, data, fieldnames):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    
    with open(filename, 'w', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for row in data:
            writer.writerow(row)

# Generate and save data to CSV files
def generate_data():
    admins = create_admins()
    trainers = create_trainers()
    employees = create_employees()
    domains = create_domains()
    trainings = create_trainings(domains)
    scores = create_scores(employees, trainings)

    write_to_csv('output/admins.csv', admins, ['firstName', 'lastName', 'email', 'password', 'role', 'gender'])
    write_to_csv('output/trainers.csv', trainers, ['firstName', 'lastName', 'email', 'password', 'role', 'gender'])
    write_to_csv('output/employees.csv', employees, ['firstName', 'lastName', 'email', 'password', 'role', 'gender'])
    write_to_csv('output/domains.csv', domains, ['name'])
    write_to_csv('output/trainings.csv', trainings, ['name', 'description', 'startDate', 'endDate', 'domainId', 'trainerId'])
    write_to_csv('output/scores.csv', scores, ['value', 'trainingId', 'employeeId', 'trainerId'])

if __name__ == "__main__":
    generate_data()
