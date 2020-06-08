USE employees_db;

-- sales id is 1, engineering is 2, finance is 3, legal is 4.
INSERT INTO department (name)
VALUES ("sales"), ("engineering"), ("finance"), ("legal");

-- Salesperson id 1, sales lead 2, lead engineer 3, software engineer 4, accountant 5, legal lead 6, lawyer 7
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 45000, 1), ("Sales Lead", 60000, 1), ("Lead Engineer", 150000, 2), ("Sofware Engineer", 100000, 2), ("Accountant", 95000, 3), ("Legal Lead", 185000, 4), ("Lawyer", 150000, 4);

-- andrew id 1, bob 2, deborah 3, edgar 4, frank 5, george 6, hank 7, john 8, kat 9
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andrew", "Allansby", 2, null), ("Bob", "Bobsworth", 1, 1), ("Deborah", "Donkavich", 1, 1), ("Edgar", "Edganton", 3, null), ("Frank", "Frankington", 4, 4), ("George", "Jackson", 4, 4), ("Hank", "Harton", 5, null), ("John", "Jonesberry", 6, null), ("Katarina", "Katmandu", 7, 8);

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
FROM department
JOIN 
