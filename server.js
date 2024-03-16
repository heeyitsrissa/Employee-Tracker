const inquirer = require('inquirer');
const mysql = require('mysql2');


const db = mysql.createConnection({
    
        host: 'localhost',
        user: 'root',
        password: 'Tante$ever*9',
        database: 'tracker_db'
   
    });

    db.connect(err => {
        if (err) throw err;
        console.log('Connected to the tracker_db database');
        start();
    });

function start() {
    inquirer
    .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update employee',
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
            case 'Update employee':
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
    return new Promise((resolve,reject) => {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) {
            reject(err);
        } else {
            console.table(res);
            start();
            resolve(res);
        }
    });
})
}

function viewRoles() {
    
    db.query(`SELECT role.id AS role_id, role.title, role.salary, department.name AS department
    FROM role 
    INNER JOIN department ON role.department_id = department.id;`, (err, res) => {
     if(err){
         throw err;
     }
     console.table(res);
     start();
    });
 }

function viewEmployees() {
    const query = `SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS role_title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
    FROM employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    db.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        start();
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
        db.query('INSERT INTO department(name) VALUES (?)', [answer.name], (err, res) => {
            if (err){ 
                console.error('Error adding department', err);
                start();
            } else {
                console.log('Department added successfully!');
                    return viewDepartments();
                    }
                })
         })
        };


function addRole() {
    inquirer
    .prompt ([
    {
        name: 'name',
        type: 'input',
        message: 'What is the name of the role?'
    },
    {
        name: 'salary',
        type: 'input',
        message: 'What is the salary of the role?'
    }
])
    .then(answer => {
        const params = [answer.name, answer.salary];
        const query = 'SELECT * FROM department';

        db.query(query, (err, res) => {
            if(err) {
                throw err;
            }
            const departments = res.map(({name, id}) => ({name: name, value: id}));
            inquirer
            .prompt([
                {
                    name: 'department',
                    type: 'list',
                    message: 'What department does this role belong to?',
                    choices: departments
                }

            ])
            .then(departmentAnswer => {
                const department = departmentAnswer.department;
                params.push(department);
                const query = `INSERT INTO role (title, salary, department_id)
                VALUES (?, ?, ?)`;

                db.query(query, params, (err) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log('Role added successfully');
                        return viewRoles();
                    }
                })
            })
        })
    })
}

function addEmployee() {
            inquirer.prompt([
                {
                    name: 'firstName',
                    type: 'input',
                    message: 'What is the employees first name?'
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: 'What is their last name?'
                },
            ])
            .then(answer => {
               const params = [answer.firstName, answer.lastName];
               const query = `SELECT * FROM role`;

               db.query(query, (err, res) => {
                if (err) {
                    throw err;
                }
                
                const roles = res.map(({title , id}) => ({name: title, value: id}));
                inquirer
                .prompt ([
                    {
                        name: 'role',
                        type: 'list',
                        message: 'What role does this employee have?',
                        choices: roles
                    }
                ])
                .then(roleAnswer => {
                    const role = roleAnswer.role;
                    params.push(role);
                    const query = `SELECT * FROM employee`;
                    db.query(query, (err, res) => {
                        if(err) {
                            throw err;
                        }
                        const managers = res.map(({first_name, last_name, id}) => ({name: `${first_name} ${last_name}`, value: id}));
                        inquirer
                        .prompt([
                            {
                                name: 'manager',
                                type: 'list',
                                message: 'Who is the employees manager?',
                                choices: managers
                            }
                        ])
                        .then(managerAnswer => {
                            const manager = managerAnswer.manager;
                            params.push(manager);
                            const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
                            db.query(query, params, (err) => {
                                if(err) {
                                    throw err;
                                }
                                console.log('Employee added successfully');
                                return viewEmployees();
                            })
                        })
                    })
                })
    
            });
        });
}  
function updateEmployee() {
    const query = `SELECT first_name, last_name, id FROM employee`;
    db.query(query, (err, res) => {
        if(err) {
            throw err;
        }
        const employees = res.map(({first_name, last_name, id}) => ({name: `${first_name} ${last_name}`, value: id}));
   
            inquirer
            .prompt ([
                {
                    name: 'employee',
                    type: 'list',
                    message: 'Which employee would you like to update?',
                    choices: employees
                
                }
            ])
            .then(employeeAnswer => {
                const employee =employeeAnswer.employee;
                const params = [employee];
                const query = `SELECT title, id FROM role`;
                db.query(query, (err, res) => {
                    if(err) {
                        throw err;
                    }
                    const roles = res.map(({title, id}) => ({name: title, value: id}));
                    inquirer
                    .prompt ([
                        {
                            name: 'role',
                            type: 'list',
                            message: 'What is the chosen employees new role?',
                            choices: roles
                        }
                    ])
                    .then(roleAnswer => {
                        const role = roleAnswer.role;
                        params.push(role);
                        const query = `UPDATE employee
                        SET role_id = ?
                        WHERE id = ?`;

                        db.query(query, params, (err) => {
                            if(err) {
                                throw err;
                            }
                            console.log('Employee updated');
                            return viewEmployees();
                        })
                    })
             })
         })
      })
    };
