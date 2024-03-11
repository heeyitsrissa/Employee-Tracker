SELECT * FROM department;

SELECT role.title, role.id AS role_id, department.name AS department, role.salary
FROM role 
INNER JOIN department ON role.department_id = department.id;

SELECT employree.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
FROM employee
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id;

INSERT INTO department(name) VALUE ('New Department Name');

INSERT INTO role (title, salary, department_id) VALUES ('New Role Title', 50000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, 1);

UPDATE employee
SET role_id = 2
WHERE id = 1;