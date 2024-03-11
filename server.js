const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'tracker_db'
    },
    console.log('Connected to the tracker_db database');
    start();
);

function start() {
    inquirer
    .createPromptModule({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'Veiw all roles',
            'View all employees',
            'Add a dpepartment',
            'add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    })
    .then(answer => {
        switch (answer.action){
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployee();
                break;
            case 'Exit':
                createConnection.end();
                console.log('See ya!');
                break;
        }
    });
}

function viewDepartments() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewRoles() {
   const query = `SELECT role.title, role.id AS role_id, department.name AS department, role.salary
   FROM role 
   INNER JOIN department ON role.department_id = department.id`;
   connection.query(query, (err, res) =>{
    if(err) throw err;
    console.table(res);
    start();
   });
}

function viewEmployees() {
    const query = `SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
    FROM employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        start;
    });
}

function addDepartment() {
    inquirer
    .prompt({
        name: 'name',
        type: 'input',
        message: 'Enter the name of the new department:'
    })
    .then(answer => {
        connection.query('INSERT INTO department(name) VALUES (?)', [answer.name], (err, res) => {
            if (err) throw err;
            console.log('Department added successfully!');
            start();
        });
    });
}

function addRole() {
    inquirer
    .prompt (
    {
        name: 'name',
        type: 'input',
        message: 'What is the name of the role?'
    },
    {
        name: 'salary',
        type: 'input',
        message: 'What is the salary of the role?'
    },
    {
        name: 'department',
        type: 'list',
        choices: [
            'Sales',
            'Engineering',
            'Finance',
            'Legal'
        ]
    }
    )
    .then(answer => {
        connection.query('')
    })
}