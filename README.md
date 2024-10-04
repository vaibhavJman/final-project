### **Project Overview: Learning Impact on Job Performance and Retention System**

This project focuses on creating a **web application** with two main user roles: **Admin** and **Trainers**. The goal is to track how learning outcomes from training programs affect employee **job performance** and **retention**. The app allows admins to manage training programs, job performance metrics, and assign trainers and employees to those programs, while trainers evaluate employees based on their training performance.

### **Key Features**

#### **1. Admin Role**
- **Training Management**:
  - Create, edit, and delete training programs based on organizational requirements.
  - Predefined training templates for common subjects like Full Stack Development, Data Engineering, etc., can be assigned to employees, simplifying the admin workload.
  
- **Job Performance Metrics**:
  - Admin can manage job performance metrics (e.g., Code Quality, Full Stack, Machine Learning, Data Engineering, Problem Solving).
  - Metrics are automatically updated based on employee training performance. A simple rule-based system is used, such as:
    - Score above 50: +10 to the metric.
    - Score above 70: +20 to the metric.
  
- **Employee and Trainer Management**:
  - Admin can create, edit, and delete employees and trainers.
  
- **Training Assignment**:
  - Admin can assign one training to each employee. The system supports only one active training per employee at a time.
  
- **Dashboard**:
  - The Admin Dashboard focuses on key performance indicators (KPIs), such as overall employee performance and insights into employee progress.
  
- **Role-Based Access Control (RBAC)**:
  - Admin has full access to the system and can manage every aspect, including trainers, employees, and training programs.

#### **2. Trainer Role**
- **Scoring and Performance Evaluation**:
  - Trainers can assign scores to employees based on their performance in the assigned training.
  - Trainers can also edit the scores if needed.

- **Dashboard**:
  - The Trainer Dashboard displays insights into the employee’s performance for the training that the trainer is assigned to, highlighting key training performance metrics.
  
- **Role-Based Access Control (RBAC)**:
  - Trainers only have access to the training data and employee performance for the training sessions they are responsible for.

### **Key Functionalities**

- **Automated Metrics Update**:
  - The system automatically updates employee job performance metrics based on their scores in the training program. The admin sets standard rules for these updates, reducing manual intervention.

- **Predefined Training Templates**:
  - Admins can use predefined training templates, simplifying the process of assigning training programs to employees based on performance needs.

- **Role-Based Dashboards**:
  - Both Admin and Trainer dashboards provide key insights with a focus on simplicity and efficiency, showing only necessary data related to their roles.

### **Tech Stack**

- **Frontend**: React.js with Tailwind CSS and shadcn components for a clean and responsive UI.
- **Backend**: Node.js with Express.js to handle RESTful APIs and business logic.
- **Database**: PostgreSQL for storing employee, trainer, training, and performance data.
- **Authorization**: Role-Based Access Control (RBAC) to ensure secure, role-specific access for Admins and Trainers.

### **Project Benefits**
- Simplified management of employee training programs.
- Clear tracking of how training affects job performance and retention.
- Streamlined role-specific dashboards for both Admins and Trainers.
- Future scalability for more complex training and evaluation systems.

This minimal web application provides essential training and performance management functionalities, with scope for future enhancements if needed.
