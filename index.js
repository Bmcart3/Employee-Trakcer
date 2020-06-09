const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employees_db"
});


//connects to server and prompts first inquirer function
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected")
    initialQuestions();
});

const roles_obj = {
    "Salesperson": 1,
    "Sales Lead": 2,
    "Lead Engineer": 3,
    "Software Engineer": 4,
    "Accountant": 5,
    "Legal Lead": 6,
    "Lawyer": 7
};

//asks user first question to determine which inquirer path to take.
const initialQuestions = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View all employees", "View all employees by department", "View all employees by role", "View all employees by manager", "Add employee", "Update employee role"],
            name: "initialSelection"
        }
    ]).then(function (answer) {
        if (answer.initialSelection === "View all employees") {
            allEmployees();
        } else if (answer.initialSelection === "View all employees by department") {
            allByDepartment();
        } else if (answer.initialSelection === "View all employees by manager") {
            allByManager();
        } else if (answer.initialSelection === "Add employee") {
            addEmployee();
        } else if (answer.initialSelection === "Update employee role") {
            updateRole();
        } else if (answer.initialSelection === "Update employee manager") {
            updateManager();
        } else {
            allRoles();
        };
    });
};

//function to run the query specified in certain functions and return a table in the console.
function runQuery(query) {
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        initialQuestions();

    })
};

//baseline query to server to get the standard desired table and saved to a variable.
const baseQuery = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id";

function allEmployees() {
    runQuery(baseQuery);
};

//standard table sorted by department.
function allByDepartment() {
    const query = baseQuery + " ORDER BY department";
    runQuery(query);
};

//standard table sorted by manager.
function allByManager() {
    const query = baseQuery + " ORDER BY employee.manager_id";
    runQuery(query);
};

//standard table sorted by role
function allRoles() {
    const query = baseQuery + " ORDER BY role.title"
    runQuery(query);
};

//add an employee with user input. need to work on the manager_id part.
function addEmployee() {
    inquirer.prompt([
        {
            message: "What is the employee's first name?",
            name: "newFName"
        },
        {
            message: "What is the new employee's last name?",
            name: "newLName"
        },
        {
            type: "list",
            message: "What is the employee's role?",
            choices: [
                "Salesperson",
                "Sales Lead", 
                "Lead Engineer", 
                "Software Engineer", 
                "Accountant", 
                "Legal Lead", 
                "Lawyer"
            ],
            name: "newRole"
        }
    ])
    .then(function(answers){
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: answers.newFName,
            last_name: answers.newLName,
            role_id: roles_obj[answers.newRole],
            manager_id: null
        })
        allEmployees();
    });
    
}

//allows user to update a specifed employees role
function updateRole() {
    inquirer.prompt([
        {
            message: "What is the employee's id?",
            name: "empId"
        },
        {
            type: "list",
            message: "What is the new employee's role?",
            choices: [
                "Salesperson",
                "Sales Lead", 
                "Lead Engineer", 
                "Software Engineer", 
                "Accountant", 
                "Legal Lead", 
                "Lawyer"
            ],
            name: "newRole"
        },
    ])
    .then(function(answers){
        connection.query("UPDATE employee SET ? WHERE id = " + answers.empId,
        {
            role_id: roles_obj[answers.newRole],
        })
        allEmployees();
    });
};






