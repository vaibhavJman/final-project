import csv
import random
import os  # Import os to handle directory creation
from faker import Faker
from datetime import datetime, timedelta
from prisma.enums import DomainEnum

faker = Faker()

# Random email generator
def generate_email(first_name, last_name):
    return f'{first_name.lower()}.{last_name.lower()}{random.randint(10, 99)}@gmail.com'

# Generate random gender
def random_gender():
    return random.choice(['MALE', 'FEMALE'])

# Create Users
def create_users(num_admins=5, num_trainers=20, num_employees=50):
    user_data = []

    # Create Admins
    for _ in range(num_admins):
        user_data.append({
            'firstName': faker.first_name(),
            'lastName': faker.last_name(),
            'email': generate_email(faker.first_name(), faker.last_name()),
            'password': 'AdminPass123',
            'role': 'ADMIN',
            'gender': random_gender(),
        })

    # Create Trainers
    for _ in range(num_trainers):
        user_data.append({
            'firstName': faker.first_name(),
            'lastName': faker.last_name(),
            'email': generate_email(faker.first_name(), faker.last_name()),
            'password': 'TrainerPass123',
            'role': 'TRAINER',
            'gender': random_gender(),
        })

    # Create Employees
    for _ in range(num_employees):
        user_data.append({
            'firstName': faker.first_name(),
            'lastName': faker.last_name(),
            'email': generate_email(faker.first_name(), faker.last_name()),
            'password': 'EmployeePass123',
            'role': 'EMPLOYEE',
            'gender': random_gender(),
        })

    return user_data

# Function to write data to CSV
def write_to_csv(filename, data, fieldnames):
    # Ensure the output directory exists
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    
    with open(filename, 'w', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for row in data:
            writer.writerow(row)

# Generate and save data to CSV files
def generate_data():
    users = create_users()
    write_to_csv('output/users.csv', users, ['firstName', 'lastName', 'email', 'password', 'role', 'gender'])

if __name__ == "__main__":
    generate_data()
