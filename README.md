# Employee-Tracker

## Description
For this challenge we were asked to make an employees traker using node.js, mysql, and inquirer. This application is a database application that tracks data of the departments, roles and employees. You are able to choose from multiple prompts where you can choose if you would like to view any any of the tables or if you would like to add a department, role, employee, or update an existing employee. This app could help a company keep track of employees, managers and salaries.

## Installation
This project required mysql2 to pull information from the tracker_db database. The first thing I did was make my schema.sql, seeds.sql, and query.sql files. I believe the most confusing part of the entire challenge was figuring out the query.sql file and how to map it out and then how to bridge the gap into the server.js. Next was setting up the inquirer prompts for the options and then the prompts within the options the user chose, lastly I worked on the prompts that added the new department roles and employees to pop up into the tables correctly.

## Usage
The user must open the application in the terminal, then the are presented with a list of options in what the want to do with the database. They can view the department, role, and employee charts or they can add a new department, role, employee, or update and existing employee. When they choose to add a new department they are asked for the department name, then that new department is added to the department table. When they add a new role they are asked the name of the roll, the salary of that role and what department that role needs to be added to, then that role will be added to the table. When they add an employee they are asked the first and last name of the employee, what role they were hired to and their manager then the new employee is added to the employee table. Lastly if they choose to update and employee they are presented with the list of employees added to the database, once the employee is selected then the list of availible roles appears to select employees new role.

![alt text](<images/Screenshot 2024-03-16 at 4.50.53 PM.png>)

![alt text](<images/Screenshot 2024-03-16 at 4.54.31 PM.png>)

![alt text](<images/Screenshot 2024-03-16 at 4.55.03 PM.png>)

## License 
![Static Badge](https://img.shields.io/badge/License-MIT-blue)
